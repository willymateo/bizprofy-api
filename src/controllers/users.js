const bcrypt = require("bcrypt");

const { BCRYPT_SALT_ROUNDS } = require("../config/app.config");
const { Companies } = require("../db/models/companies");
const { Users } = require("../db/models/users");
const { ORDER } = require("../constants");

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
  try {
    const { password = "", ...newUserData } = req.body;
    const {
      company: { id: companyId = "" },
    } = req.decodedToken;

    const company = await Companies.findByPk(companyId);

    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const newUserInstance = Users.build({ ...newUserData, companyId, passwordHash });

    // Validate data
    await newUserInstance.validate();

    // Save the registers in the DB
    const newUser = await newUserInstance.save();

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUsers };
