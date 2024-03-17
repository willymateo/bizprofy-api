const { createProductCategorySchema } = require("../../ajvSchemas/productCategories");
const { validateAJVSchema } = require(".");

const validateCreateProductCategorySchema = (req, res, next) => {
  req.ajv = {
    schema: createProductCategorySchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateProductCategorySchema };
