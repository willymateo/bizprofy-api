const { Router } = require("express");

const { validateCreateProductSchema } = require("../middlewares/validateAJVSchema/products");
const { createProduct, getProducts } = require("../controllers/products");

const router = Router();

router.get("/", getProducts);

router.post("/", validateCreateProductSchema, createProduct);

module.exports = router;
