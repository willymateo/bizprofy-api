const { Router } = require("express");

const {
  validateWarehouseActivationSchema,
  validateCreateWarehouseSchema,
  validateGetWarehousesSchema,
  validateEditWarehouseSchema,
} = require("../middlewares/validateAJVSchema/warehouses");
const { verifyToken } = require("../middlewares/authJwt");
const {
  manageWarehouseActivationById,
  editWarehouseById,
  getWarehouseById,
  createWarehouse,
  getWarehouses,
} = require("../controllers/warehouses");

const router = Router();

router.get("/:id", verifyToken, getWarehouseById);
router.patch("/:id", validateEditWarehouseSchema, verifyToken, editWarehouseById);
router.patch(
  "/:id/activation",
  validateWarehouseActivationSchema,
  verifyToken,
  manageWarehouseActivationById,
);

router.get("/", validateGetWarehousesSchema, verifyToken, getWarehouses);
router.post("/", validateCreateWarehouseSchema, verifyToken, createWarehouse);

module.exports = router;
