const { Router } = require("express");

const { validateCreateCustomerSchema } = require("../middlewares/validateAJVSchema/customers");
const { createCustomer } = require("../controllers/customers");

const router = Router();

router.post("/", validateCreateCustomerSchema, createCustomer);

module.exports = router;
