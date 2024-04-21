const Sequelize = require("sequelize");

const { CurrentStock } = require("../../db/models/currentStock");
const { Warehouses } = require("../../db/models/warehouses");
const { Providers } = require("../../db/models/providers");
const { Customers } = require("../../db/models/customers");
const { Products } = require("../../db/models/products");
const { StockOut } = require("../../db/models/stockOut");
const { sequelize } = require("../../db/connection");
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
            [Sequelize.Op.gte]: transactionDateGreaterThanOrEqualTo,
          }),
          ...(transactionDateLessThanOrEqualTo && {
            [Sequelize.Op.lte]: transactionDateLessThanOrEqualTo,
          }),
        },
      }),
      ...(productIds && {
        productId: {
          [Sequelize.Op.in]: productIds.split(","),
        },
      }),
      ...(warehouseIds && {
        warehouseId: {
          [Sequelize.Op.in]: warehouseIds.split(","),
        },
      }),
    };

    const [summarizedData] =
      (await StockOut.findAll({
        attributes: [
          [Sequelize.fn("sum", Sequelize.col("quantity")), "totalQuantity"],
          [Sequelize.fn("sum", Sequelize.literal("unit_price * quantity")), "totalPriceSum"],
        ],
        where: conditions,
      })) ?? [];

    const stockData =
      (await StockOut.findAndCountAll({
        include: [
          {
            include: [{ model: Providers, as: "provider" }],
            where: { companyId: company.id },
            model: Products,
            as: "product",
          },
          { model: Customers, as: "customer" },
        ],
        attributes: { exclude: ["productId", "customerId"] },
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

const createStockOut = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { productId = "", warehouseId = "", quantity = 0 } = req.body;

    const product = await Products.findByPk(productId, {
      transaction: t,
    });

    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    const warehouse = await Warehouses.findByPk(warehouseId, {
      transaction: t,
    });

    if (!warehouse) {
      return res.status(400).json({ error: "Warehouse not found" });
    }

    const productCurrentStock = await CurrentStock.findOne({
      lock: Sequelize.Transaction.LOCK.UPDATE,
      where: {
        warehouseId,
        productId,
      },
      transaction: t,
    });

    if (!productCurrentStock) {
      throw new Error("There are no stock for this product in this warehouse");
    }

    const currentStockAtMoment = productCurrentStock.quantity - quantity;

    if (currentStockAtMoment < 0) {
      throw new Error(
        `There are only ${productCurrentStock.quantity} units in stock in this warehouse`,
      );
    }

    const newStockOutInstance = StockOut.build({
      ...req.body,
      currentStockAtMoment,
    });

    // Validate data
    await newStockOutInstance.validate();

    // Save the registers in the DB
    const newStock = await newStockOutInstance.save();

    await productCurrentStock.decrement("quantity", {
      transaction: t,
      by: quantity,
    });

    await t.commit();

    res.status(201).json(newStock);
  } catch (error) {
    await t.rollback();

    next(error);
  }
};

module.exports = { getStockOut, createStockOut };
