const { Router } = require("express");

const stockOutRouter = require("./out");
const stockInRouter = require("./in");

const router = Router();

router.use("/out", stockOutRouter);
router.use("/in", stockInRouter);

module.exports = router;
