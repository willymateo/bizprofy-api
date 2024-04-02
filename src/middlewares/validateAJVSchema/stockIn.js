const { createStockInSchema, getStockInSchema } = require("../../ajvSchemas/stockIn");
const { validateAJVSchema } = require(".");

const validateCreateStockInSchema = (req, res, next) => {
  req.ajv = {
    schema: createStockInSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateGetStockInSchema = (req, res, next) => {
  req.ajv = {
    schema: getStockInSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateStockInSchema, validateGetStockInSchema };
