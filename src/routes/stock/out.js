const { Router } = require("express");

const { getStockOut, createStockOut } = require("../../controllers/stock/out");
const {
  validateCreateStockOutSchema,
  validateGetStockOutSchema,
} = require("../../middlewares/validateAJVSchema/stock/out");
const { verifyToken } = require("../../middlewares/authJwt");

const router = Router();

router.get("/", validateGetStockOutSchema, verifyToken, getStockOut);

router.post("/", validateCreateStockOutSchema, verifyToken, createStockOut);

module.exports = router;
