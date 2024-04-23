const { validateAJVSchema } = require("..");
const {
  productCategoryActivationSchema,
  createProductCategorySchema,
  getProductCategoriesSchema,
  editProductCategorySchema,
} = require("../../../ajvSchemas/products/categories");

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

const validateProductCategoryActivationSchema = (req, res, next) => {
  req.ajv = {
    schema: productCategoryActivationSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = {
  validateProductCategoryActivationSchema,
  validateCreateProductCategorySchema,
  validateEditProductCategorySchema,
  validateGetProductCategorySchema,
};
