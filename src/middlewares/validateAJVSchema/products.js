const {
  getProductsSchema,
  createProductSchema,
  getProductCategoriesSchema,
  createProductCategorySchema,
  editProductCategorySchema,
} = require("../../ajvSchemas/products");
const { validateAJVSchema } = require(".");

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

const validateGetProductCategorySchema = (req, res, next) => {
  req.ajv = {
    schema: getProductCategoriesSchema,
    data: req.query,
  };

  validateAJVSchema(req, res, next);
};

const validateCreateProductCategorySchema = (req, res, next) => {
  req.ajv = {
    schema: createProductCategorySchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

const validateEditProductCategorySchema = (req, res, next) => {
  req.ajv = {
    schema: editProductCategorySchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = {
  validateCreateProductCategorySchema,
  validateEditProductCategorySchema,
  validateGetProductCategorySchema,
  validateCreateProductSchema,
  validateGetProductSchema,
};
