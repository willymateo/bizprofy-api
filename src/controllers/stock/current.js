const Sequelize = require("sequelize");

const { ProductCategories } = require("../../db/models/productCategories");
const { CurrentStock } = require("../../db/models/currentStock");
const { Providers } = require("../../db/models/providers");
const { Products } = require("../../db/models/products");
const { StockOut } = require("../../db/models/stockOut");
const { StockIn } = require("../../db/models/stockIn");
const { ORDER } = require("../../constants");

const getCurrentStock = async (req, res, next) => {
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

    const productConditions = {
      companyId: company.id,
      ...(productIds && {
        id: {
          [Sequelize.Op.in]: productIds.split(","),
        },
      }),
    };

    const productsData =
      (await Products.findAndCountAll({
        include: [
          { model: ProductCategories, as: "productCategory" },
          { model: Providers, as: "provider" },
        ],
        attributes: { exclude: ["providerId", "productCategoryId"] },
        where: productConditions,
        offset,
        limit,
        order: [["createdAt", order]],
      })) ?? {};

    const stockInAndStockOutConditions = {
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
      productId: {
        [Sequelize.Op.in]: productsData?.rows?.map(product => product.id) ?? [],
      },
      ...(warehouseIds && {
        warehouseId: {
          [Sequelize.Op.in]: warehouseIds.split(","),
        },
      }),
    };

    const currentStockConditions = {
      productId: {
        [Sequelize.Op.in]: productsData?.rows?.map(product => product.id) ?? [],
      },
      ...(warehouseIds && {
        warehouseId: {
          [Sequelize.Op.in]: warehouseIds.split(","),
        },
      }),
    };

    const stockSummarizedDataConditions = {
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

    const currentStockData = await CurrentStock.findAll({
      where: currentStockConditions,
    });

    const stockInData =
      (await StockIn.findAll({
        where: stockInAndStockOutConditions,
        order: [[orderByField, order]],
      })) ?? [];

    const stockOutData =
      (await StockOut.findAll({
        where: stockInAndStockOutConditions,
        order: [[orderByField, order]],
      })) ?? [];

    const [{ dataValues: { totalCurrentStock = 0 } = {} } = {}] =
      (await CurrentStock.findAll({
        attributes: [[Sequelize.fn("sum", Sequelize.col("quantity")), "totalCurrentStock"]],
        where: currentStockConditions,
      })) ?? [];

    const [{ dataValues: { totalPurchasesNumber = 0, totalCostSum = 0 } = {} } = {}] =
      await StockIn.findAll({
        attributes: [
          [Sequelize.fn("sum", Sequelize.col("quantity")), "totalPurchasesNumber"],
          [Sequelize.fn("sum", Sequelize.literal("quantity * unit_cost")), "totalCostSum"],
        ],
        where: stockSummarizedDataConditions,
      });

    const [{ dataValues: { totalSalesNumber = 0, totalPriceSum = 0 } = {} } = {}] =
      await StockOut.findAll({
        attributes: [
          [Sequelize.fn("sum", Sequelize.col("quantity")), "totalSalesNumber"],
          [Sequelize.fn("sum", Sequelize.literal("quantity * unit_price")), "totalPriceSum"],
        ],
        where: stockSummarizedDataConditions,
      });

    const rows = productsData.rows.map(product => {
      let purchasesNumber = 0;
      let currentStock = 0;
      let salesNumber = 0;
      let totalPrice = 0;
      let totalCost = 0;

      const productStockOut = stockOutData?.filter(stock => stock.productId === product.id) ?? [];
      const productStockIn = stockInData?.filter(stock => stock.productId === product.id) ?? [];
      const productCurrentStock =
        currentStockData?.filter(stock => stock.productId === product.id) ?? [];

      productStockIn?.forEach(stock => {
        purchasesNumber += stock.quantity;
        totalCost += stock.unitCost * stock.quantity;
      });

      productStockOut?.forEach(stock => {
        salesNumber += stock.quantity;
        totalPrice += stock.unitPrice * stock.quantity;
      });

      productCurrentStock?.forEach(stock => {
        currentStock += stock.quantity;
      });

      return {
        purchasesNumber,
        currentStock,
        salesNumber,
        totalPrice,
        totalCost,
        product,
      };
    });

    res.status(200).json({
      count: productsData.count,
      summarizedData: {
        profit: totalPriceSum - totalCostSum,
        totalPurchasesNumber,
        totalCurrentStock,
        totalSalesNumber,
        totalPriceSum,
        totalCostSum,
      },
      rows,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCurrentStock };
