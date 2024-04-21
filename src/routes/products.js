const { Router } = require("express");

const { verifyToken } = require("../middlewares/authJwt");
const {
  validateCreateProductCategorySchema,
  validateEditProductCategorySchema,
  validateGetProductCategorySchema,
  validateCreateProductSchema,
  validateGetProductSchema,
} = require("../middlewares/validateAJVSchema/products");
const {
  editProductCategoryById,
  getProductCategoryById,
  createProductCategory,
  getProductCategories,
  createProduct,
  getProducts,
} = require("../controllers/products");

const router = Router();

router.get("/categories/:id", verifyToken, getProductCategoryById);
router.patch(
  "/categories/:id",
  validateEditProductCategorySchema,
  verifyToken,
  editProductCategoryById,
);
router.get("/categories", verifyToken, validateGetProductCategorySchema, getProductCategories);
router.post("/categories", verifyToken, validateCreateProductCategorySchema, createProductCategory);

router.get("/", verifyToken, getProducts, validateGetProductSchema);
router.post("/", validateCreateProductSchema, verifyToken, createProduct);

module.exports = router;
