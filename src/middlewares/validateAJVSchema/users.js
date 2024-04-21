const { createUserSchema, getUsersSchema, editUserSchema } = require("../../ajvSchemas/users");
const { validateAJVSchema } = require(".");

const validateCreateUserSchema = (req, res, next) => {
  req.ajv = {
    schema: createUserSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateEditUserSchema = (req, res, next) => {
  req.ajv = {
    schema: editUserSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateGetUsersSchema = (req, res, next) => {
  req.ajv = {
    schema: getUsersSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};
module.exports = { validateCreateUserSchema, validateGetUsersSchema, validateEditUserSchema };
