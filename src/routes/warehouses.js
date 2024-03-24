const { Router } = require("express");

const { validateCreateWarehouseSchema } = require("../middlewares/validateAJVSchema/warehouses");
const { createWarehouse } = require("../controllers/warehouses");

const router = Router();

router.post("/", validateCreateWarehouseSchema, createWarehouse);

module.exports = router;
