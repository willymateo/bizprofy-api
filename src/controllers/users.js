const bcrypt = require("bcrypt");

const { BCRYPT_SALT_ROUNDS } = require("../config/app.config");
const { Companies } = require("../db/models/companies");
const { Users } = require("../db/models/users");

const createUser = async (req, res, next) => {
  try {
    const { password = "", companyName = "", ...newUserData } = req.body;

    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const newCompanyInstance = Companies.build({ name: companyName });
    const newUserInstance = Users.build({
      ...newUserData,
      companyId: newCompanyInstance.id,
      passwordHash,
    });

    // Validate data
    await Promise.all([newUserInstance.validate(), newCompanyInstance.validate()]);

    // Save the registers in the DB
    await newCompanyInstance.save();
    await newUserInstance.save();

    res.status(201).json({ message: "Company and user created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };
