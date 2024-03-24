const { Op } = require("sequelize");

const { Warehouses } = require("../db/models/warehouses");
const { StockTypes } = require("../db/models/stockTypes");
const { Products } = require("../db/models/products");
const { Stock } = require("../db/models/stock");
const { ORDER } = require("../constants");

const getStock = async (req, res, next) => {
  try {
    const { company } = req.decodedToken;
    const {
      transactionDateGreaterThanOrEqualTo,
      transactionDateLessThanOrEqualTo,
      quantityGreaterThanOrEqualTo = 0,
      orderByField = "transactionDate",
      quantityLessThanOrEqualTo,
      order = ORDER.DESC,
      stockTypeIds = "",
      productIds = "",
      limit = 50,
      offset = 0,
    } = req.query;

    const bdResult = await Stock.findAndCountAll({
      include: [
        { model: Products, as: "product", where: { companyId: company.id } },
        { model: StockTypes, as: "stockType" },
        { model: Warehouses, as: "warehouse" },
      ],
      attributes: { exclude: ["stockTypeId", "productId"] },
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
        ...(stockTypeIds && {
          stockTypeId: {
            [Op.in]: stockTypeIds.split(","),
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

const createStock = async (req, res, next) => {
  try {
    const { company } = req.decodedToken;
    const { productId = "" } = req.body;

    const product = await Products.findOne({
      where: { id: productId, companyId: company.id },
    });

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const newStockInstance = Stock.build(req.body);

    // Validate data
    await newStockInstance.validate();

    // Save the registers in the DB
    const newStock = await newStockInstance.save();

    res.status(201).json(newStock);
  } catch (error) {
    next(error);
  }
};

module.exports = { getStock, createStock };
