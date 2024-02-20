const { Users } = require("../db/models/users");

const login = async (req, res, next) => {
  try {
    const { username = "", password = "" } = req.body;

    const user = await Users.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).send({ error: "Invalid username or password" });
    }

    const matchPassword = await user.comparePassword(password);

    if (!matchPassword) {
      return res.status(401).send({ error: "Invalid username or password" });
    }

    req.tokenPayload = { id: user.id };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
