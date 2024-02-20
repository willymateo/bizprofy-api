const { Op } = require("sequelize");

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

    const { passwordHash: _, ...userWithoutPassword } = user.dataValues;

    res.status(200).send(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
