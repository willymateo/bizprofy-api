const { createProvidersSchema, getProvidersSchema } = require("../../ajvSchemas/providers");
const { validateAJVSchema } = require(".");

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

module.exports = { validateCreateProviderSchema, validateGetProvidersSchema };
