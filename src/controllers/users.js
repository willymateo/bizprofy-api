const { Users } = require("../db/models/users");

const createUser = async (req, res, next) => {
  try {
    const { password, ...newUserData } = req.body;

    const passwordHash = await Users.encryptPassword(password);

    const newUserInstance = Users.build({ ...newUserData, passwordHash });
    await newUserInstance.validate();
    // Save the registers in the DB
    await newUserInstance.save();

    req.tokenPayload = { id: newUserInstance.id };
    req.onSucessMessage = "Success sign up";
    req.onSucessCode = 201;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };
