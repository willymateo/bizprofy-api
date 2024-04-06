const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

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
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!user) {
      return res.status(401).send({ error: { message: "Invalid credentials" } });
    }

    const matchPassword = await user.comparePassword(password);

    if (!matchPassword) {
      return res.status(401).send({ error: { message: "Invalid credentials" } });
    }

    const company = await user.getCompany();

    const { passwordHash: _, companyId: __, ...userWithoutPassword } = user.dataValues;

    req.tokenPayload = {
      ...userWithoutPassword,
      company: company.dataValues,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { password = "", companyName = "", ...newUserData } = req.body;
    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const newCompanyInstance = Companies.build({ name: companyName });
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

    await t.commit();

    return res.status(201).json({
      warehouse: newDefaultWarehouse,
      company: newCompany,
      user: newUser,
    });
  } catch (err) {
    await t.rollback();

    next(err);
  }
};

module.exports = { login, signUp };
