const { Customers } = require("../db/models/customers");
const { ORDER } = require("../constants");

const getCustomers = async (req, res, next) => {
  try {
    const { orderByField = "createdAt", order = ORDER.DESC, limit = 50, offset = 0 } = req.query;
    const { company } = req.decodedToken;

    const bdResult = await Customers.findAndCountAll({
      where: { companyId: company.id },
      paranoid: false,
      offset,
      limit,
      order: [[orderByField, order]],
    });

    res.status(200).json(bdResult);
  } catch (err) {
    next(err);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const email = req.body.email || null;
    const {
      company: { id: companyId },
    } = req.auth;

    const newCustomerInstance = Customers.build({
      ...req.body,
      companyId,
      email,
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

module.exports = { createCustomer, getCustomers };
