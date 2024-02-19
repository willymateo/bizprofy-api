import { Users } from "../db/models/users";

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({
      where: { username },
    });

    // Not signed up user.
    if (!user) {
      return res.status(401).send({
        error: "Invalid username or password",
      });
    }

    const matchPassword = await user.comparePassword(password);
    // Incorrect password.
    if (!matchPassword) {
      return res.status(401).send({
        error: "Invalid username or password",
      });
    }

    req.tokenPayload = { id: user.id };
    next();
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

export { login };
