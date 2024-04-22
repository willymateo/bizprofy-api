const { Router } = require("express");

const {
  validateCreateCustomerSchema,
  validateGetCustomersSchema,
  validateEditCustomerSchema,
} = require("../middlewares/validateAJVSchema/customers");
const { verifyToken } = require("../middlewares/authJwt");
const {
  editCustomerById,
  getCustomerById,
  createCustomer,
  getCustomers,
} = require("../controllers/customers");

const router = Router();

router.get("/:id", verifyToken, getCustomerById);
router.patch("/:id", validateEditCustomerSchema, verifyToken, editCustomerById);
router.get("/", validateGetCustomersSchema, verifyToken, getCustomers);
router.post("/", validateCreateCustomerSchema, verifyToken, createCustomer);

module.exports = router;
