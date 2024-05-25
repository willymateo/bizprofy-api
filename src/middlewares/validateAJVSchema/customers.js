const { validateAJVSchema } = require(".");
const {
  getCustomersStockStatusSchema,
  customerActivationSchema,
  createCustomerSchema,
  getCustomersSchema,
  editCustomerSchema,
} = require("../../ajvSchemas/customers");

const validateGetCustomersSchema = (req, res, next) => {
  req.ajv = {
    schema: getCustomersSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

const validateGetCustomersStockStatusSchema = (req, res, next) => {
  req.ajv = {
    schema: getCustomersStockStatusSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

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

const validateCustomerActivationSchema = (req, res, next) => {
  req.ajv = {
    schema: customerActivationSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = {
  validateGetCustomersStockStatusSchema,
  validateCustomerActivationSchema,
  validateCreateCustomerSchema,
  validateGetCustomersSchema,
  validateEditCustomerSchema,
};
