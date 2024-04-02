const { Op } = require("sequelize");

const { Warehouses } = require("../../db/models/warehouses");
const { Providers } = require("../../db/models/providers");
const { Products } = require("../../db/models/products");
const { StockIn } = require("../../db/models/stockIn");
const { ORDER } = require("../../constants");

const getStockIn = async (req, res, next) => {
  try {
    const { company } = req.decodedToken;
    const {
      transactionDateGreaterThanOrEqualTo,
      transactionDateLessThanOrEqualTo,
      quantityGreaterThanOrEqualTo = 0,
      orderByField = "transactionDate",
      quantityLessThanOrEqualTo,
      order = ORDER.DESC,
      productIds = "",
      limit = 50,
      offset = 0,
    } = req.query;

    const bdResult = await StockIn.findAndCountAll({
      include: [
        {
          include: [{ model: Providers, as: "provider" }],
          where: { companyId: company.id },
          model: Products,
          as: "product",
        },
        { model: Warehouses, as: "warehouse" },
      ],
      attributes: { exclude: ["productId"] },
      where: {
        ...((quantityLessThanOrEqualTo || quantityGreaterThanOrEqualTo) && {
          quantity: {
            ...(quantityLessThanOrEqualTo && {
              [Op.lte]: quantityLessThanOrEqualTo,
            }),
            ...(quantityGreaterThanOrEqualTo && {
              [Op.gte]: quantityGreaterThanOrEqualTo,
            }),
          },
        }),
        ...((transactionDateGreaterThanOrEqualTo || transactionDateLessThanOrEqualTo) && {
          transactionDate: {
            ...(transactionDateGreaterThanOrEqualTo && {
              [Op.gte]: transactionDateGreaterThanOrEqualTo,
            }),
            ...(transactionDateLessThanOrEqualTo && {
              [Op.lte]: transactionDateLessThanOrEqualTo,
            }),
          },
        }),
        ...(productIds && {
          productId: {
            [Op.in]: productIds.split(","),
          },
        }),
      },
      offset,
      limit,
      order: [[orderByField, order]],
    });

    res.status(200).json(bdResult);
  } catch (error) {
    next(error);
  }
};

const createStockIn = async (req, res, next) => {
  try {
    const newStockInInstance = StockIn.build(req.body);

    // Validate data
    await newStockInInstance.validate();

    // Save the registers in the DB
    const newStock = await newStockInInstance.save();

    res.status(201).json(newStock);
  } catch (error) {
    next(error);
  }
};

module.exports = { getStockIn, createStockIn };
