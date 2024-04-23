const { validateAJVSchema } = require(".");
const {
  userActivationSchema,
  createUserSchema,
  getUsersSchema,
  editUserSchema,
} = require("../../ajvSchemas/users");

const validateGetUsersSchema = (req, res, next) => {
  req.ajv = {
    schema: getUsersSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

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

const validateUserActivationSchema = (req, res, next) => {
  req.ajv = {
    schema: userActivationSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = {
  validateUserActivationSchema,
  validateCreateUserSchema,
  validateGetUsersSchema,
  validateEditUserSchema,
};
