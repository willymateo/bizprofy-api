const { Router } = require("express");

const { createWarehouse, getWarehouses } = require("../controllers/warehouses");
const {
  validateCreateWarehouseSchema,
  validateGetWarehousesSchema,
} = require("../middlewares/validateAJVSchema/warehouses");
const { verifyToken } = require("../middlewares/authJwt");

const router = Router();

router.get("/", validateGetWarehousesSchema, verifyToken, getWarehouses);
router.post("/", validateCreateWarehouseSchema, verifyToken, createWarehouse);

module.exports = router;
