const { validateAJVSchema } = require(".");
const {
  createCustomerSchema,
  getCustomersSchema,
  editCustomerSchema,
} = require("../../ajvSchemas/customers");

const validateCreateCustomerSchema = (req, res, next) => {
  req.ajv = {
    schema: createCustomerSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateEditCustomerSchema = (req, res, next) => {
  req.ajv = {
    schema: editCustomerSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateGetCustomersSchema = (req, res, next) => {
  req.ajv = {
    schema: getCustomersSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

module.exports = {
  validateCreateCustomerSchema,
  validateGetCustomersSchema,
  validateEditCustomerSchema,
};
