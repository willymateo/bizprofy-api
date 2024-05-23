const { getStockStatusSchema } = require("../../../ajvSchemas/stock");
const { validateAJVSchema } = require("..");

const validateGetStockStatusSchema = (req, res, next) => {
  req.ajv = {
    schema: getStockStatusSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateGetStockStatusSchema };
