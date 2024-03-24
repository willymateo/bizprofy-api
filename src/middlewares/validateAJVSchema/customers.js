const { createCustomerSchema, getCustomersSchema } = require("../../ajvSchemas/customers");
const { validateAJVSchema } = require(".");

const validateCreateCustomerSchema = (req, res, next) => {
  req.ajv = {
    schema: createCustomerSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateGetCustomersSchema = (req, res, next) => {
  req.ajv = {
    schema: getCustomersSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateCustomerSchema, validateGetCustomersSchema };
