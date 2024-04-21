const {
  createWarehouseSchema,
  getWarehousesSchema,
  editWarehouseSchema,
} = require("../../ajvSchemas/warehouses");
const { validateAJVSchema } = require(".");

const validateCreateWarehouseSchema = (req, res, next) => {
  req.ajv = {
    schema: createWarehouseSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateEditWarehouseSchema = (req, res, next) => {
  req.ajv = {
    schema: editWarehouseSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateGetWarehousesSchema = (req, res, next) => {
  req.ajv = {
    schema: getWarehousesSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

module.exports = {
  validateCreateWarehouseSchema,
  validateGetWarehousesSchema,
  validateEditWarehouseSchema,
};
