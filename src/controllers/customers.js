const { Customers } = require("../db/models/customers");

const createCustomer = async (req, res, next) => {
  try {
    const {
      company: { id: companyId },
    } = req.auth;

    const newCustomerInstance = Customers.build({
      ...req.body,
      companyId,
    });

    // Validate data
    await newCustomerInstance.validate();

    // Save the registers in the DB
    const newCustomer = await newCustomerInstance.save();

    res.status(201).json(newCustomer);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCustomer };
