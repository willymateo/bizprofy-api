const { validateAJVSchema } = require("..");
const {
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
  validateProductActivationSchema,
  validateCreateProductSchema,
  validateEditProductSchema,
  validateGetProductSchema,
};
