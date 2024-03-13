const { createStockSquema, getStockSquema } = require("../../ajvSchemas/stock");
const { validateAJVSchema } = require(".");

const validateCreateStockSchema = (req, res, next) =>
  validateAJVSchema(req, res, next, createStockSquema);

const validateGetStockSchema = (req, res, next) =>
  validateAJVSchema(req, res, next, getStockSquema);

module.exports = { validateCreateStockSchema, validateGetStockSchema };
