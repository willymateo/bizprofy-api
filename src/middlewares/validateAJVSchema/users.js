const { createUserSchema } = require("../../ajvSchemas/users");
const { validateAJVSchema } = require(".");

const validateCreateUserSchema = (req, res, next) => {
  req.ajv = {
    schema: createUserSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateUserSchema };
