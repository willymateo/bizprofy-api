const { createProductSchema } = require("../../ajvSchemas/products");
const { validateAJVSchema } = require(".");

const validateCreateProductSchema = (req, res, next) => {
  req.ajv = {
    schema: createProductSchema,
    data: req.body,
  };

  validateAJVSchema(req, res, next);
};

module.exports = { validateCreateProductSchema };
