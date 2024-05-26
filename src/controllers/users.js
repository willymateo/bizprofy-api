const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const { UserEntityAccess } = require("../db/models/userEntityAccess");
const { BCRYPT_SALT_ROUNDS } = require("../config/app.config");
const { Companies } = require("../db/models/companies");
const { Entities } = require("../db/models/entities");
const { sequelize } = require("../db/connection");
const { Users } = require("../db/models/users");
const { ORDER } = require("../constants");

const getUserById = async (req, res, next) => {
  try {
    const { id = "" } = req.params;

    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    res.status(200).json({
      ...user.toJSON(),
      passwordHash: undefined,
    });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { orderByField = "createdAt", order = ORDER.DESC, limit = 50, offset = 0 } = req.query;
    const { company } = req.decodedToken;

    const bdResult =
      (await Users.findAndCountAll({
        where: { companyId: company.id },
        paranoid: false,
        offset,
        limit,
        order: [[orderByField, order]],
      })) ?? {};

    res.status(200).json(bdResult);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { password = "", ...newUserData } = req.body;
    const {
      company: { id: companyId = "" },
    } = req.decodedToken;

    const company = await Companies.findByPk(companyId);

    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }

    const userWithSameEmail = await Users.findOne({
      where: {
        email: newUserData.email,
      },
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

    const newUserInstance = Users.build({ ...newUserData, companyId, passwordHash });

    const entities = await Entities.findAll();

    const newUserEntityAccess = entities.map(({ name = "" } = {}) => ({
      userId: newUserInstance.id,
      hasAccess: true,
      entityId: name,
    }));

    // Validate data
    await newUserInstance.validate();

    // Save the registers in the DB
    const newUser = await newUserInstance.save({ transaction: t });

    await UserEntityAccess.bulkCreate(newUserEntityAccess, { transaction: t });

    const emailVerificationToken = uuidv4();

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

    await t.commit();

    return res.status(201).json(newUser);
  } catch (error) {
    await t.rollback();

    next(error);
  }
};

const editUserById = async (req, res, next) => {
  try {
    const { password = "", ...newUserData } = req.body;
    const { id = "" } = req.params;
    let passwordHash = "";

    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    if (password) {
      passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    }

    user.set({
      ...newUserData,
      ...(password && { passwordHash }),
    });

    // Validate data
    await user.validate();

    // Save the registers in the DB
    const newUser = await user.save();

    return res.status(201).json({
      ...newUser.toJSON(),
      passwordHash: undefined,
    });
  } catch (error) {
    next(error);
  }
};

const manageUserActivationById = async (req, res, next) => {
  try {
    const { force = false, activate = true } = req.body;
    const { id = "" } = req.params;

    const user = await Users.findByPk(id, {
      attributes: { exclude: ["passwordHash"] },
      paranoid: false,
    });

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    if (activate) {
      await user.restore();
    } else {
      await user.destroy({ force });
    }

    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUsers, getUserById, editUserById, manageUserActivationById };
