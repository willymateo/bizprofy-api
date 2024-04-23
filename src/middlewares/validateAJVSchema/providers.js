const { validateAJVSchema } = require(".");
const {
  providerActivationSchema,
  createProvidersSchema,
  getProvidersSchema,
  editProviderSchema,
} = require("../../ajvSchemas/providers");

const validateGetProvidersSchema = (req, res, next) => {
  req.ajv = {
    schema: getProvidersSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

const validateCreateProviderSchema = (req, res, next) => {
  req.ajv = {
    schema: createProvidersSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateEditProviderSchema = (req, res, next) => {
  req.ajv = {
    schema: editProviderSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateProviderActivationSchema = (req, res, next) => {
  req.ajv = {
    schema: providerActivationSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = {
  validateProviderActivationSchema,
  validateCreateProviderSchema,
  validateGetProvidersSchema,
  validateEditProviderSchema,
};
