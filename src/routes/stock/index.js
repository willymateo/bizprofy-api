const { Router } = require("express");

const stockOutRouter = require("./out");
const stockInRouter = require("./in");
const currentStock = require("./current");

const router = Router();

router.use("/current", currentStock);
router.use("/out", stockOutRouter);
router.use("/in", stockInRouter);

module.exports = router;
