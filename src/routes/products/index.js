const { Router } = require("express");

const { verifyToken } = require("../../middlewares/authJwt");
const {
  validateGetProductsStockStatusSchema,
  validateProductActivationSchema,
  validateCreateProductSchema,
  validateEditProductSchema,
  validateGetProductSchema,
} = require("../../middlewares/validateAJVSchema/products");
const productCategoriesRouter = require("./categories");
const {
  manageProductActivationById,
  getProductsStockStatus,
  editProductById,
  getProductById,
  createProduct,
  getProducts,
} = require("../../controllers/products");

const router = Router();

router.use("/categories", productCategoriesRouter);

router.get("/", verifyToken, getProducts, validateGetProductSchema);

router.get(
  "/stock/status",
  validateGetProductsStockStatusSchema,
  verifyToken,
  getProductsStockStatus,
);
router.post("/", validateCreateProductSchema, verifyToken, createProduct);

router.get("/:id", verifyToken, getProductById);

router.patch("/:id", validateEditProductSchema, verifyToken, editProductById);

router.patch(
  "/:id/activation",
  validateProductActivationSchema,
  verifyToken,
  manageProductActivationById,
);

module.exports = router;
