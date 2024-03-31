const { createStockInSquema, getStockInSquema } = require("../../ajvSchemas/stockIn");
const { validateAJVSchema } = require(".");

const validateCreateStockInSchema = (req, res, next) => {
  req.ajv = {
    schema: createStockInSquema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateGetStockInSchema = (req, res, next) => {
  req.ajv = {
    schema: getStockInSquema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateStockInSchema, validateGetStockInSchema };
