const { Router } = require("express");

const { validateCreateProductSchema } = require("../middlewares/validateAJVSchema/products");
const { createProduct, getProducts } = require("../controllers/products");
const { verifyToken } = require("../middlewares/authJwt");

const router = Router();

router.get("/", verifyToken, getProducts);

router.post("/", validateCreateProductSchema, verifyToken, createProduct);

module.exports = router;
