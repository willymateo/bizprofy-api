const { createUserSchema } = require("../../ajvSchemas/users");
const { validateAJVSchema } = require(".");

const validateCreateUserSchema = (req, res, next) =>
  validateAJVSchema(req, res, next, createUserSchema);

module.exports = { validateCreateUserSchema };
