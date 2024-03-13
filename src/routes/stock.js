const { Router } = require("express");

const { getStock, createStock } = require("../controllers/stock");
const { verifyToken } = require("../middlewares/authJwt");
const {
  validateCreateStockSchema,
  validateGetStockSchema,
} = require("../middlewares/validateAJVSchema/stock");

const router = Router();

router.get("/", validateGetStockSchema, verifyToken, getStock);

router.post("/", validateCreateStockSchema, verifyToken, createStock);

module.exports = router;
