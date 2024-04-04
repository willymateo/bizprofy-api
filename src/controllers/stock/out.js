const sequelize = require("sequelize");

const { Warehouses } = require("../../db/models/warehouses");
const { Providers } = require("../../db/models/providers");
const { Customers } = require("../../db/models/customers");
const { Products } = require("../../db/models/products");
const { StockOut } = require("../../db/models/stockOut");
const { ORDER } = require("../../constants");

const getStockOut = async (req, res, next) => {
  try {
    const { company } = req.decodedToken;
    const {
      transactionDateGreaterThanOrEqualTo,
      transactionDateLessThanOrEqualTo,
      orderByField = "transactionDate",
      order = ORDER.DESC,
      warehouseIds = "",
      productIds = "",
      limit = 50,
      offset = 0,
    } = req.query;

    const conditions = {
      ...((transactionDateGreaterThanOrEqualTo || transactionDateLessThanOrEqualTo) && {
        transactionDate: {
          ...(transactionDateGreaterThanOrEqualTo && {
            [sequelize.Op.gte]: transactionDateGreaterThanOrEqualTo,
          }),
          ...(transactionDateLessThanOrEqualTo && {
            [sequelize.Op.lte]: transactionDateLessThanOrEqualTo,
          }),
        },
      }),
      ...(productIds && {
        productId: {
          [sequelize.Op.in]: productIds.split(","),
        },
      }),
      ...(warehouseIds && {
        warehouseId: {
          [sequelize.Op.in]: warehouseIds.split(","),
        },
      }),
    };

    const [summarizedData] =
      (await StockOut.findAll({
        attributes: [
          [sequelize.fn("sum", sequelize.col("quantity")), "totalQuantity"],
          [sequelize.fn("sum", sequelize.literal("unit_price * quantity")), "totalPriceSum"],
        ],
        where: conditions,
      })) ?? [];

    const stockData = await StockOut.findAndCountAll({
      include: [
        {
          include: [{ model: Providers, as: "provider" }],
          where: { companyId: company.id },
          model: Products,
          as: "product",
        },
        { model: Warehouses, as: "warehouse" },
        { model: Customers, as: "customer" },
      ],
      attributes: { exclude: ["productId"] },
      where: conditions,
      offset,
      limit,
      order: [[orderByField, order]],
    });

    res.status(200).json({
      summarizedData,
      ...stockData,
    });
  } catch (error) {
    next(error);
  }
};

const createStockOut = async (req, res, next) => {
  try {
    const newStockOutInstance = StockOut.build(req.body);

    // Validate data
    await newStockOutInstance.validate();

    // Save the registers in the DB
    const newStock = await newStockOutInstance.save();

    res.status(201).json(newStock);
  } catch (error) {
    next(error);
  }
};

module.exports = { getStockOut, createStockOut };
