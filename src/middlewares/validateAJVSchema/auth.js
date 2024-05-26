const { loginSchema, signUpSchema, emailVerificationSchema } = require("../../ajvSchemas/auth");
const { validateAJVSchema } = require(".");

const validateLoginSchema = (req, res, next) => {
  req.ajv = {
    schema: loginSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateSignUpSchema = (req, res, next) => {
  req.ajv = {
    schema: signUpSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateEmailVerificationSchema = (req, res, next) => {
  req.ajv = {
    schema: emailVerificationSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateLoginSchema, validateSignUpSchema, validateEmailVerificationSchema };
