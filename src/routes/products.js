const { Router } = require("express");

const {
  getProducts,
  createProduct,
  getProductCategories,
  createProductCategory,
} = require("../controllers/products");
const {
  validateGetProductSchema,
  validateCreateProductSchema,
  validateGetProductCategorySchema,
  validateCreateProductCategorySchema,
} = require("../middlewares/validateAJVSchema/products");
const { verifyToken } = require("../middlewares/authJwt");

const router = Router();

router.get("/", verifyToken, getProducts, validateGetProductSchema);

router.get("/categories", verifyToken, validateGetProductCategorySchema, getProductCategories);

router.post("/categories", verifyToken, validateCreateProductCategorySchema, createProductCategory);

router.post("/", validateCreateProductSchema, verifyToken, createProduct);

module.exports = router;
