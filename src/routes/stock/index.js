const { Router } = require("express");

const currentStock = require("./current");
const stockOutRouter = require("./out");
const stockInRouter = require("./in");

const router = Router();

router.use("/current", currentStock);
router.use("/out", stockOutRouter);
router.use("/in", stockInRouter);

module.exports = router;
