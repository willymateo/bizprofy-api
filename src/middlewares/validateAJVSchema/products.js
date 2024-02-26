const { createProductSchema } = require("../../ajvSchemas/products");
const { validateAJVSchema } = require(".");

const validateCreateProductSchema = (req, res, next) =>
  validateAJVSchema(req, res, next, createProductSchema);

module.exports = { validateCreateProductSchema };
