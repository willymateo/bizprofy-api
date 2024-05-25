const { validateAJVSchema } = require("..");
const {
  getProductsStockStatusSchema,
  productActivationSchema,
  createProductSchema,
  getProductsSchema,
  editProductSchema,
} = require("../../../ajvSchemas/products");

const validateGetProductSchema = (req, res, next) => {
  req.ajv = {
    schema: getProductsSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

const validateGetProductsStockStatusSchema = (req, res, next) => {
  req.ajv = {
    schema: getProductsStockStatusSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

const validateCreateProductSchema = (req, res, next) => {
  req.ajv = {
    schema: createProductSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateEditProductSchema = (req, res, next) => {
  req.ajv = {
    schema: editProductSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateProductActivationSchema = (req, res, next) => {
  req.ajv = {
    schema: productActivationSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = {
  validateGetProductsStockStatusSchema,
  validateProductActivationSchema,
  validateCreateProductSchema,
  validateEditProductSchema,
  validateGetProductSchema,
};
