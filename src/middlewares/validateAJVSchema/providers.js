const { validateAJVSchema } = require(".");
const {
  createProvidersSchema,
  getProvidersSchema,
  editProviderSchema,
} = require("../../ajvSchemas/providers");

const validateCreateProviderSchema = (req, res, next) => {
  req.ajv = {
    schema: createProvidersSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateGetProvidersSchema = (req, res, next) => {
  req.ajv = {
    schema: getProvidersSchema,
    data: req.query,
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

module.exports = {
  validateCreateProviderSchema,
  validateGetProvidersSchema,
  validateEditProviderSchema,
};
