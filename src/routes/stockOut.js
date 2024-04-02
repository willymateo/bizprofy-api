const { Router } = require("express");

const { getStockOut, createStockOut } = require("../controllers/stockOut");
const { verifyToken } = require("../middlewares/authJwt");
const {
  validateCreateStockOutSchema,
  validateGetStockOutSchema,
} = require("../middlewares/validateAJVSchema/stockOut");

const router = Router();

router.get("/", validateGetStockOutSchema, verifyToken, getStockOut);

router.post("/", validateCreateStockOutSchema, verifyToken, createStockOut);

module.exports = router;
