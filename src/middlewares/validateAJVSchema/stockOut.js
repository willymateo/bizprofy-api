const { createStockOutSchema, getStockOutSchema } = require("../../ajvSchemas/stockOut");
const { validateAJVSchema } = require(".");

const validateCreateStockOutSchema = (req, res, next) => {
  req.ajv = {
    schema: createStockOutSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateGetStockOutSchema = (req, res, next) => {
  req.ajv = {
    schema: getStockOutSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateStockOutSchema, validateGetStockOutSchema };
