const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/app.config");

const createToken = (req, res) => {
  const message = req.onSucessMessage || "Success authentication";
  const onSucessCode = req.onSucessCode || 200;
  const payload = req.tokenPayload;

  jwt.sign(payload, JWT_SECRET, (error, token) => {
    if (error) {
      console.log(error);
      return res.status(409).send({ error: `${error.name} - ${error.message}` });
    }

    return res.status(onSucessCode).send({ message, token });
  });
};

module.exports = { createToken };
