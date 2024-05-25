const { Router } = require("express");

const {
  validateGetCustomersStockStatusSchema,
  validateCustomerActivationSchema,
  validateCreateCustomerSchema,
  validateGetCustomersSchema,
  validateEditCustomerSchema,
} = require("../middlewares/validateAJVSchema/customers");
const { verifyToken } = require("../middlewares/authJwt");
const {
  manageCustomerActivationById,
  getCustomersStockStatus,
  editCustomerById,
  getCustomerById,
  createCustomer,
  getCustomers,
} = require("../controllers/customers");

const router = Router();

router.get("/", validateGetCustomersSchema, verifyToken, getCustomers);

router.get(
  "/stock/status",
  validateGetCustomersStockStatusSchema,
  verifyToken,
  getCustomersStockStatus,
);

router.post("/", validateCreateCustomerSchema, verifyToken, createCustomer);

router.get("/:id", verifyToken, getCustomerById);

router.patch("/:id", validateEditCustomerSchema, verifyToken, editCustomerById);

router.patch(
  "/:id/activation",
  validateCustomerActivationSchema,
  verifyToken,
  manageCustomerActivationById,
);

module.exports = router;
