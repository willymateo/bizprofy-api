const { Op } = require("sequelize");

const { Customers } = require("../db/models/customers");
const { ORDER } = require("../constants");

const getCustomerById = async (req, res, next) => {
  try {
    const { id = "" } = req.params;

    const customer = await Customers.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: { message: "Customer not found" } });
    }

    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const { company } = req.decodedToken;
    const {
      orderByField = "createdAt",
      order = ORDER.DESC,
      limit = 50,
      offset = 0,
      q = "",
    } = req.query;

    const bdResult =
      (await Customers.findAndCountAll({
        where: {
          companyId: company.id,
          ...(q && {
            [Op.or]: [
              {
                idCard: {
                  [Op.iLike]: `%${q}%`,
                },
              },
              {
                firstNames: {
                  [Op.iLike]: `%${q}%`,
                },
              },
              {
                lastNames: {
                  [Op.iLike]: `%${q}%`,
                },
              },
            ],
          }),
        },
        paranoid: false,
        offset,
        limit,
        order: [[orderByField, order]],
      })) ?? {};

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

const editCustomerById = async (req, res, next) => {
  try {
    const email = req.body.email || null;
    const { id = "" } = req.params;

    const customer = await Customers.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: { message: "Customer not found" } });
    }

    customer.set({ ...req.body, email });

    // Validate data
    await customer.validate();

    // Save the registers in the DB
    const newCustomer = await customer.save();

    res.status(200).json(newCustomer);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCustomer, getCustomers, editCustomerById, getCustomerById };
