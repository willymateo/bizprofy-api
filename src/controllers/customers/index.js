const Sequelize = require("sequelize");

const { Customers } = require("../../db/models/customers");
const { StockOut } = require("../../db/models/stockOut");
const { STOCK_STATUS_FIELDS } = require("./constants");
const { ORDER } = require("../../constants");

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
            [Sequelize.Op.or]: [
              {
                idCard: {
                  [Sequelize.Op.iLike]: `%${q}%`,
                },
              },
              {
                firstNames: {
                  [Sequelize.Op.iLike]: `%${q}%`,
                },
              },
              {
                lastNames: {
                  [Sequelize.Op.iLike]: `%${q}%`,
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

const getCustomersStockStatus = async (req, res, next) => {
  try {
    const {
      orderByField = STOCK_STATUS_FIELDS.STOCK_OUT_TOTAL_QUANTITY,
      transactionDateGreaterThanOrEqualTo,
      transactionDateLessThanOrEqualTo,
      order = ORDER.DESC,
      offset = 0,
      limit = 5,
    } = req.query;
    const { company } = req.decodedToken;

    const stockOutData =
      (await StockOut.findAll({
        include: [
          {
            where: { companyId: company.id },
            model: Customers,
            as: "customer",
          },
        ],
        attributes: [
          [
            Sequelize.cast(Sequelize.fn("sum", Sequelize.col("quantity")), "INTEGER"),
            STOCK_STATUS_FIELDS.STOCK_OUT_TOTAL_QUANTITY,
          ],
          [
            Sequelize.fn("sum", Sequelize.literal('"StockOut"."unit_price" * quantity')),
            STOCK_STATUS_FIELDS.TOTAL_PRICE_SUM,
          ],
        ],
        where: {
          transactionDate: {
            [Sequelize.Op.gte]: transactionDateGreaterThanOrEqualTo,
            [Sequelize.Op.lte]: transactionDateLessThanOrEqualTo,
          },
        },
        group: ["customer.id"],
        order: [[Sequelize.literal(orderByField), order]],
        offset,
        limit,
      })) ?? [];

    const data =
      stockOutData?.map(
        ({
          dataValues: {
            [STOCK_STATUS_FIELDS.STOCK_OUT_TOTAL_QUANTITY]: totalQuantity = 0,
            [STOCK_STATUS_FIELDS.TOTAL_PRICE_SUM]: totalPriceSum = 0,
            ...rest
          } = {},
        } = {}) => ({
          ...rest,
          totalQuantity,
          totalPriceSum,
        }),
      ) ?? [];

    return res.status(200).json({ data });
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

    const customerWithSameIdCard = await Customers.findOne({
      where: {
        idCard: req.body.idCard,
        companyId,
      },
    });

    if (customerWithSameIdCard) {
      return res
        .status(400)
        .json({ error: { message: "Customer with the same ID card already exists" } });
    }

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

const manageCustomerActivationById = async (req, res, next) => {
  try {
    const { force = false, activate = true } = req.body;
    const { id = "" } = req.params;

    const customer = await Customers.findByPk(id, {
      paranoid: false,
    });

    if (!customer) {
      return res.status(404).json({ error: { message: "Customer not found" } });
    }

    if (activate) {
      await customer.restore();
    } else {
      await customer.destroy({ force });
    }

    return res.status(200).send(customer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  manageCustomerActivationById,
  getCustomersStockStatus,
  editCustomerById,
  getCustomerById,
  createCustomer,
  getCustomers,
};
