const sequelize = require("sequelize");

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
      (await StockIn.findAll({
        attributes: [
          [sequelize.fn("sum", sequelize.col("quantity")), "totalQuantity"],
          [sequelize.fn("sum", sequelize.literal("unit_cost * quantity")), "totalCostSum"],
        ],
        where: conditions,
      })) ?? [];

    const stockData =
      (await StockIn.findAndCountAll({
        include: [
          {
            include: [{ model: Providers, as: "provider" }],
            where: { companyId: company.id },
            model: Products,
            as: "product",
          },
        ],
        attributes: { exclude: ["productId"] },
        where: conditions,
        offset,
        limit,
        order: [[orderByField, order]],
      })) ?? {};

    res.status(200).json({
      summarizedData,
      ...stockData,
    });
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
