const { loginSchema } = require("../../ajvSchemas/auth");
const { validateAJVSchema } = require(".");

const validateLoginSchema = (req, res, next) => {
  req.ajv = {
    schema: loginSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateLoginSchema };
