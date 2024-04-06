const sequelize = require("sequelize");

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

    const productsData =
      (await Products.findAndCountAll({
        include: [
          { model: ProductCategories, as: "productCategory" },
          { model: Providers, as: "provider" },
        ],
        attributes: { exclude: ["providerId", "productCategoryId"] },
        where: { companyId: company.id },
        offset,
        limit,
        order: [["createdAt", order]],
      })) ?? {};

    const stockConditions = {
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
      productId: {
        [sequelize.Op.in]: productsData?.rows?.map(product => product.id) ?? [],
      },
    };

    const stockInData =
      (await StockIn.findAll({
        where: stockConditions,
        order: [[orderByField, order]],
      })) ?? [];

    const stockOutData =
      (await StockOut.findAll({
        where: stockConditions,
        order: [[orderByField, order]],
      })) ?? [];

    const rows = productsData.rows.map(product => {
      let purchasesNumber = 0;
      let salesNumber = 0;
      let totalPrice = 0;
      let totalCost = 0;

      const productStockIn = stockInData?.filter(stock => stock.productId === product.id) ?? [];
      const productStockOut = stockOutData?.filter(stock => stock.productId === product.id) ?? [];

      // const currentStock = await CurrentStock.findOne({
      // where: { productId: product.id },
      // });

      productStockIn.forEach(stock => {
        purchasesNumber += stock.quantity;
        totalCost += stock.unitCost * stock.quantity;
      });

      productStockOut.forEach(stock => {
        salesNumber += stock.quantity;
        totalPrice += stock.unitPrice * stock.quantity;
      });

      return {
        purchasesNumber,
        salesNumber,
        totalPrice,
        totalCost,
        product,
      };
    });

    let totalPurchasesNumber = 0;
    let totalSalesNumber = 0;
    let totalPriceSum = 0;
    let totalCostSum = 0;
    let profit = 0;

    res.status(200).json({
      count: productsData.count,
      summarizedData: {
        totalPurchasesNumber,
        totalSalesNumber,
        totalPriceSum,
        totalCostSum,
        profit,
      },
      rows,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCurrentStock };
