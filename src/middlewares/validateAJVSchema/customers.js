const { createCustomerSchema } = require("../../ajvSchemas/customers");
const { validateAJVSchema } = require(".");

const validateCreateCustomerSchema = (req, res, next) => {
  req.ajv = {
    schema: createCustomerSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateCustomerSchema };
