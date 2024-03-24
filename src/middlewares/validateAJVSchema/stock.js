const { createStockSquema, getStockSquema } = require("../../ajvSchemas/stock");
const { validateAJVSchema } = require(".");

const validateCreateStockSchema = (req, res, next) => {
  req.ajv = {
    schema: createStockSquema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateGetStockSchema = (req, res, next) => {
  req.ajv = {
    schema: getStockSquema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateStockSchema, validateGetStockSchema };
