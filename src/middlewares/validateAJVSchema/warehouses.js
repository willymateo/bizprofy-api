const { createWarehouseSchema } = require("../../ajvSchemas/warehouses");
const { validateAJVSchema } = require(".");

const validateCreateWarehouseSchema = (req, res, next) => {
  req.ajv = {
    schema: createWarehouseSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateWarehouseSchema };
