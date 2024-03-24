const { Router } = require("express");

const { createProductCategory } = require("../controllers/productCategories");
const {
  validateCreateProductCategorySchema,
} = require("../middlewares/validateAJVSchema/productCategories");

const router = Router();

router.post("/", validateCreateProductCategorySchema, createProductCategory);

module.exports = router;
