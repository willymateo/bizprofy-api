const { validateAJVSchema } = require("..");
const {
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

module.exports = {
  validateCreateProductCategorySchema,
  validateEditProductCategorySchema,
  validateGetProductCategorySchema,
};
