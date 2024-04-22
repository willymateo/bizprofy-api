const { Router } = require("express");

const {
  validateCreateWarehouseSchema,
  validateGetWarehousesSchema,
  validateEditWarehouseSchema,
} = require("../middlewares/validateAJVSchema/warehouses");
const { verifyToken } = require("../middlewares/authJwt");
const {
  createWarehouse,
  getWarehouses,
  getWarehouseById,
  editWarehouseById,
} = require("../controllers/warehouses");

const router = Router();

router.get("/:id", verifyToken, getWarehouseById);
router.patch("/:id", validateEditWarehouseSchema, verifyToken, editWarehouseById);
router.get("/", validateGetWarehousesSchema, verifyToken, getWarehouses);
router.post("/", validateCreateWarehouseSchema, verifyToken, createWarehouse);

module.exports = router;
