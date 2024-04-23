const { Router } = require("express");

const { verifyToken } = require("../../middlewares/authJwt");
const {
  validateCreateProductSchema,
  validateEditProductSchema,
  validateGetProductSchema,
} = require("../../middlewares/validateAJVSchema/products");
const {
  editProductById,
  getProductById,
  createProduct,
  getProducts,
} = require("../../controllers/products");
const productCategoriesRouter = require("./categories");

const router = Router();

router.use("/categories", productCategoriesRouter);

router.get("/:id", verifyToken, getProductById);
router.patch("/:id", validateEditProductSchema, verifyToken, editProductById);

router.get("/", verifyToken, getProducts, validateGetProductSchema);
router.post("/", validateCreateProductSchema, verifyToken, createProduct);

module.exports = router;
