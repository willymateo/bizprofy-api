const { getCurrentStockSchema } = require("../../../ajvSchemas/stock/current");
const { validateAJVSchema } = require("..");

const validateGetCurrentStockSchema = (req, res, next) => {
  req.ajv = {
    schema: getCurrentStockSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateGetCurrentStockSchema };
