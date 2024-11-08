const { ajv } = require("../../config/app.config");

const validateAJVSchema = (req, res, next) => {
  const { schema, data: dataToValidate } = req.ajv ?? {};
  const validate = ajv.compile(schema);
  const isValid = validate(dataToValidate);

  if (!isValid) {
    console.log("Some error ocurred validating schema");
    console.log(validate.errors);

    const errorMessage = validate.errors.map(({ message = "" } = {}) => message).join(", ");

    return res.status(400).send({
      error: {
        name: "Invalid body schema",
        message: errorMessage,
      },
    });
  }

  next();
};

module.exports = { validateAJVSchema };
