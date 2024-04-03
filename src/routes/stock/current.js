const { Router } = require("express");

const { getCurrentStock } = require("../../controllers/stock/current");
const {
  validateGetCurrentStockSchema,
} = require("../../middlewares/validateAJVSchema/stock/current");
const { verifyToken } = require("../../middlewares/authJwt");

const router = Router();

router.get("/", validateGetCurrentStockSchema, verifyToken, getCurrentStock);

module.exports = router;
