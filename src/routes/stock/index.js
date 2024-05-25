const { Router } = require("express");

const { validateGetStockStatusSchema } = require("../../middlewares/validateAJVSchema/stock");
const { getStockStatus } = require("../../controllers/stock");
const { verifyToken } = require("../../middlewares/authJwt");
const currentStock = require("./current");
const stockOutRouter = require("./out");
const stockInRouter = require("./in");

const router = Router();

router.get("/status", validateGetStockStatusSchema, verifyToken, getStockStatus);
router.use("/current", currentStock);
router.use("/out", stockOutRouter);
router.use("/in", stockInRouter);

module.exports = router;
