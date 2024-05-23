const { Router } = require("express");

const {
  validateGetProductCategoriesStockStatusSchema,
  validateProductCategoryActivationSchema,
  validateCreateProductCategorySchema,
  validateEditProductCategorySchema,
  validateGetProductCategorySchema,
} = require("../../middlewares/validateAJVSchema/products/categories");
const { verifyToken } = require("../../middlewares/authJwt");
const {
  manageProductCategoryActivationById,
  getProductCategoriesStockStatus,
  editProductCategoryById,
  getProductCategoryById,
  createProductCategory,
  getProductCategories,
} = require("../../controllers/products/categories");

const router = Router();

router.get("/", verifyToken, validateGetProductCategorySchema, getProductCategories);

router.get(
  "/stock/status",
  validateGetProductCategoriesStockStatusSchema,
  verifyToken,
  getProductCategoriesStockStatus,
);

router.post("/", verifyToken, validateCreateProductCategorySchema, createProductCategory);

router.get("/:id", verifyToken, getProductCategoryById);

router.patch("/:id", validateEditProductCategorySchema, verifyToken, editProductCategoryById);

router.patch(
  "/:id/activation",
  validateProductCategoryActivationSchema,
  verifyToken,
  manageProductCategoryActivationById,
);

module.exports = router;
