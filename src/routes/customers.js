const { Router } = require("express");

const {
  validateCustomerActivationSchema,
  validateCreateCustomerSchema,
  validateGetCustomersSchema,
  validateEditCustomerSchema,
} = require("../middlewares/validateAJVSchema/customers");
const { verifyToken } = require("../middlewares/authJwt");
const {
  manageCustomerActivationById,
  editCustomerById,
  getCustomerById,
  createCustomer,
  getCustomers,
} = require("../controllers/customers");

const router = Router();

router.get("/:id", verifyToken, getCustomerById);
router.patch("/:id", validateEditCustomerSchema, verifyToken, editCustomerById);
router.patch(
  "/:id/activation",
  validateCustomerActivationSchema,
  verifyToken,
  manageCustomerActivationById,
);

router.get("/", validateGetCustomersSchema, verifyToken, getCustomers);
router.post("/", validateCreateCustomerSchema, verifyToken, createCustomer);

module.exports = router;
