const { loginSchema } = require("../../ajvSchemas/auth");

const validateLoginSchema = (req, res, next, validate) => {
  const validateLoginSchema = ajv.compile(loginSchema);

  const isValid = validateLoginSchema(req.body);

  if (!isValid) {
    console.log("Some error ocurred validating body schema");
    console.log(validate.errors);

    return res.status(400).send({ error: "Invalid body schema" });
  }

  next();
};

module.exports = { validateLoginSchema };
