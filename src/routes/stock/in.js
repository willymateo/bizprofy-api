const { Router } = require("express");

const { getStockIn, createStockIn } = require("../../controllers/stock/in");
const { verifyToken } = require("../../middlewares/authJwt");
const {
  validateCreateStockInSchema,
  validateGetStockInSchema,
} = require("../../middlewares/validateAJVSchema/stock/in");

const router = Router();

router.get("/", validateGetStockInSchema, verifyToken, getStockIn);

router.post("/", validateCreateStockInSchema, verifyToken, createStockIn);

module.exports = router;
