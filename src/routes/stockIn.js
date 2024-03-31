const { Router } = require("express");

const { getStockIn, createStockIn } = require("../controllers/stockIn");
const { verifyToken } = require("../middlewares/authJwt");
const {
  validateCreateStockInSchema,
  validateGetStockInSchema,
} = require("../middlewares/validateAJVSchema/stockIn");

const router = Router();

router.get("/", validateGetStockInSchema, verifyToken, getStockIn);

router.post("/", validateCreateStockInSchema, verifyToken, createStockIn);

module.exports = router;
