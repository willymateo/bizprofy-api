const { v4: uuidv4 } = require("uuid");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

const { UserEmailVerifications } = require("../db/models/UserEmailVerifications");
const { UserEntityPermissions } = require("../db/models/userEntityPermissions");
const { EMAIL_VERIFICATION_MINUTES_TO_EXPIRE } = require("../constants");
const { EntityPermissions } = require("../db/models/entityPermissions");
const { UserEntityAccess } = require("../db/models/userEntityAccess");
const { BCRYPT_SALT_ROUNDS } = require("../config/app.config");
const { Warehouses } = require("../db/models/warehouses");
const { Companies } = require("../db/models/companies");
const { sequelize } = require("../db/connection");
const { Users } = require("../db/models/users");

const login = async (req, res, next) => {
  try {
    const { emailOrUsername = "", password = "" } = req.body;

    const user = await Users.findOne({
      where: {
        [Sequelize.Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!user) {
      return res.status(401).send({ error: { message: "Invalid credentials" } });
    }

    const matchPassword = await user.comparePassword(password);

    if (!matchPassword) {
      return res.status(401).send({ error: { message: "Invalid credentials" } });
    }

    if (!user.emailIsVerified) {
      return res
        .status(401)
        .send({ error: { message: "Please check your email to verify your account" } });
    }

    const company = await user.getCompany();
    const entityPermissions = await user.getPermissions();

    const { passwordHash: _, companyId: __, ...userWithoutPassword } = user.dataValues;

    req.tokenPayload = {
      ...userWithoutPassword,
      company: company.dataValues,
      entityPermissions,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const {
      companyName = "",
      companyCountryCode = "",
      companyCountryName = "",
      companyStateCode = "",
      companyStateName = "",
      companyCityCode = "",
      companyCityName = "",
      password = "",
      ...newUserData
    } = req.body;

    const userWithSameEmail = await Users.findOne({
      where: {
        email: newUserData.email,
      },
      transaction: t,
    });

    if (userWithSameEmail) {
      return res.status(400).json({
        error: {
          message: "The email is already in use",
          name: "EmailInUse",
        },
      });
    }

    const userWithSameUsername = await Users.findOne({
      where: {
        username: newUserData.username,
      },
      transaction: t,
    });

    if (userWithSameUsername) {
      return res.status(400).json({
        error: {
          message: "The username is already in use",
          name: "UsernameInUse",
        },
      });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const newCompanyInstance = Companies.build({
      countryCode: companyCountryCode,
      countryName: companyCountryName,
      stateCode: companyStateCode,
      stateName: companyStateName,
      cityCode: companyCityCode,
      name: companyName,
    });
    const newDefaultWarehouseInstance = Warehouses.build({
      companyId: newCompanyInstance.id,
      code: "MAIN",
      name: "Main",
    });
    const newUserInstance = Users.build({
      ...newUserData,
      companyId: newCompanyInstance.id,
      passwordHash,
    });

    // Validate data
    await Promise.all([
      newDefaultWarehouseInstance.validate(),
      newCompanyInstance.validate(),
      newUserInstance.validate(),
    ]);

    // Save the registers in the DB
    const newCompany = await newCompanyInstance.save({
      transaction: t,
    });
    const newDefaultWarehouse = await newDefaultWarehouseInstance.save({
      transaction: t,
    });
    const newUser = await newUserInstance.save({
      transaction: t,
    });

    const entityPermissions = await EntityPermissions.findAll();
    let entities = entityPermissions?.map(({ entityId }) => entityId);
    entities = [...new Set(entities)];

    const newUserEntityAccess = entities?.map(entityId => ({
      userId: newUser.id,
      hasAccess: true,
      entityId,
    }));

    const newUserEntityPermissions = entityPermissions?.map(entityPermission => ({
      entityPermissionId: entityPermission.id,
      userId: newUser.id,
      hasAccess: true,
    }));

    await UserEntityAccess.bulkCreate(newUserEntityAccess, { transaction: t });
    await UserEntityPermissions.bulkCreate(newUserEntityPermissions, { transaction: t });

    const expirationDate = dayjs().add(EMAIL_VERIFICATION_MINUTES_TO_EXPIRE, "minutes");
    const emailVerificationToken = uuidv4();
    const newEmailVerificationInstance = UserEmailVerifications.build({
      token: emailVerificationToken,
      expiresAt: expirationDate,
      userId: newUser.id,
      activatedAt: null,
    });

    await newEmailVerificationInstance.validate();
    await newEmailVerificationInstance.save({ transaction: t });

    const { data, error: errorSendingEmailVerification } = await newUser.sendVerificationEmail({
      token: emailVerificationToken,
    });

    if (errorSendingEmailVerification) {
      console.log("Error sending the email verification", errorSendingEmailVerification);

      await t.rollback();

      return res.status(500).json({
        error: {
          message: "Error sending the email verification",
          name: "EmailVerificationError",
        },
      });
    }

    console.log("Email verification sent successfully", data);

    let permissions = {};

    entityPermissions?.forEach(({ entityId = "", permission = "" } = {}) => {
      if (!permissions?.[entityId]) {
        permissions[entityId] = {
          hasAccess: true,
          granted: [],
        };
      }

      permissions[entityId] = {
        ...(permissions?.[entityId] ?? {}),
        granted: [...(permissions?.[entityId]?.granted ?? []), permission],
      };
    });

    await t.commit();

    return res.status(201).json({
      warehouse: newDefaultWarehouse,
      company: newCompany,
      user: {
        ...newUser.dataValues,
        permissions,
      },
    });
  } catch (err) {
    await t.rollback();

    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { token = "" } = req.body;

    const userEmailVerification = await UserEmailVerifications.findOne({
      where: {
        token,
      },
      order: [["createdAt", "DESC"]],
    });

    if (!userEmailVerification) {
      return res
        .status(400)
        .send({ error: { message: "The verification token is invalid", name: "InvalidToken" } });
    }

    if (userEmailVerification.activatedAt) {
      return res.status(400).send({
        error: { message: "The account has already been verified", name: "AlreadyVerified" },
      });
    }

    if (dayjs().isAfter(userEmailVerification.expiresAt)) {
      return res
        .status(400)
        .send({ error: { message: "The verification token has expired", name: "ExpiredToken" } });
    }

    const user = await Users.findByPk(userEmailVerification.userId);

    if (!user) {
      return res.status(400).send({ error: { message: "User not found", name: "UserNotFound" } });
    }

    await Promise.all([
      userEmailVerification.update({ activatedAt: dayjs() }, { transaction: t }),
      user.update({ emailIsVerified: true }, { transaction: t }),
    ]);

    const { data, error: errorSendingWelcomeEmail } = await user.sendWelcomeEmail();

    if (errorSendingWelcomeEmail) {
      console.log("Error sending the welcome email", errorSendingWelcomeEmail);
    } else {
      console.log("Welcome email sent successfully", data);
    }

    await t.commit();

    return res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    await t.rollback();

    next(error);
  }
};

module.exports = { login, signUp, verifyEmail };
