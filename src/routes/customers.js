const { Router } = require("express");

const { createCustomer, getCustomers } = require("../controllers/customers");
const { verifyToken } = require("../middlewares/authJwt");
const {
  validateCreateCustomerSchema,
  validateGetCustomersSchema,
} = require("../middlewares/validateAJVSchema/customers");

const router = Router();

router.get("/", validateGetCustomersSchema, verifyToken, getCustomers);
router.post("/", validateCreateCustomerSchema, verifyToken, createCustomer);

module.exports = router;
