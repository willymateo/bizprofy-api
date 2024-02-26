const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/app.config");
const { Users } = require("../db/models/users");

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
      return res.status(401).send({ error: { message: "Token missing or invalid" } });
    }

    // Skip the Bearer word.
    const token = authorization.substring(7);

    jwt.verify(token, JWT_SECRET, async (error, decodedToken) => {
      if (error) {
        console.log("Error verifying the JWT", error);

        return res.status(409).send({
          error: {
            message: error.message,
            name: error.name,
          },
        });
      }

      const userInstance = await Users.findByPk(decodedToken.id, {});
      const companyInstance = await userInstance.getCompany();

      if (!userInstance) {
        console.log("No user found in the JWT");

        return res.status(401).send({ error: { message: "Token missing or invalid" } });
      }

      if (!companyInstance) {
        console.log("No company found in the JWT");

        return res.status(401).send({ error: { message: "Token missing or invalid" } });
      }

      req.decodedToken = decodedToken;
      req.auth = {
        company: companyInstance,
        user: userInstance,
      };

      next();
    });
  } catch (error) {
    console.log("General error verifying the JWT", error);

    return res.status(409).send({
      error: {
        message: error.message,
        name: error.name,
      },
    });
  }
};

const createToken = (req, res) => {
  const onSucessCode = req.onSucessCode || 200;
  const payload = req.tokenPayload;

  jwt.sign(payload, JWT_SECRET, (error, token) => {
    if (error) {
      console.log("Error signing the JWT", error);

      return res.status(409).send({
        error: {
          message: error.message,
          name: error.name,
        },
      });
    }

    return res.status(onSucessCode).send({
      ...payload,
      token,
    });
  });
};

module.exports = { createToken, verifyToken };
