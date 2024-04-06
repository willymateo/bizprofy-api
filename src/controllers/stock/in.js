const Sequelize = require("sequelize");

const { CurrentStock } = require("../../db/models/currentStock");
const { Warehouses } = require("../../db/models/warehouses");
const { Providers } = require("../../db/models/providers");
const { Products } = require("../../db/models/products");
const { StockIn } = require("../../db/models/stockIn");
const { sequelize } = require("../../db/connection");
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
      (await StockIn.findAll({
        attributes: [
          [Sequelize.fn("sum", Sequelize.col("quantity")), "totalQuantity"],
          [Sequelize.fn("sum", Sequelize.literal("unit_cost * quantity")), "totalCostSum"],
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

    let productCurrentStock = await CurrentStock.findOne({
      lock: Sequelize.Transaction.LOCK.UPDATE,
      where: {
        warehouseId,
        productId,
      },
      transaction: t,
    });

    if (!productCurrentStock) {
      await CurrentStock.create(
        {
          warehouseId,
          quantity: 0,
          productId,
        },
        { transaction: t },
      );

      productCurrentStock = await CurrentStock.findOne({
        lock: Sequelize.Transaction.LOCK.UPDATE,
        transaction: t,
        where: {
          warehouseId,
          productId,
        },
      });
    }

    const newStockInInstance = StockIn.build({
      ...req.body,
      currentStockAtMoment: productCurrentStock.quantity + quantity,
    });

    // Validate data
    await newStockInInstance.validate();

    // Save the registers in the DB
    const newStock = await newStockInInstance.save({
      transaction: t,
    });

    await productCurrentStock.increment("quantity", {
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

module.exports = { getStockIn, createStockIn };
