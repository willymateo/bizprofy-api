const { Router } = require("express");

const {
  validateCreateProductCategorySchema,
  validateEditProductCategorySchema,
  validateGetProductCategorySchema,
} = require("../../middlewares/validateAJVSchema/products/categories");
const { verifyToken } = require("../../middlewares/authJwt");
const {
  editProductCategoryById,
  getProductCategoryById,
  createProductCategory,
  getProductCategories,
} = require("../../controllers/products/categories");

const router = Router();

router.get("/:id", verifyToken, getProductCategoryById);
router.patch("/:id", validateEditProductCategorySchema, verifyToken, editProductCategoryById);

router.get("/", verifyToken, validateGetProductCategorySchema, getProductCategories);
router.post("/", verifyToken, validateCreateProductCategorySchema, createProductCategory);

module.exports = router;
