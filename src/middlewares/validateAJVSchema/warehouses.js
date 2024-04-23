const {
  warehouseActivationSchema,
  createWarehouseSchema,
  getWarehousesSchema,
  editWarehouseSchema,
} = require("../../ajvSchemas/warehouses");
const { validateAJVSchema } = require(".");

const validateGetWarehousesSchema = (req, res, next) => {
  req.ajv = {
    schema: getWarehousesSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

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

const validateWarehouseActivationSchema = (req, res, next) => {
  req.ajv = {
    schema: warehouseActivationSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = {
  validateWarehouseActivationSchema,
  validateCreateWarehouseSchema,
  validateGetWarehousesSchema,
  validateEditWarehouseSchema,
};
