const Sequelize = require("sequelize");
const dayjs = require("dayjs");

const { Products } = require("../../db/models/products");
const { StockOut } = require("../../db/models/stockOut");
const { StockIn } = require("../../db/models/stockIn");
const { ORDER } = require("../../constants");

const getStockStatus = async (req, res, next) => {
  try {
    const {
      transactionDateGreaterThanOrEqualTo,
      transactionDateLessThanOrEqualTo,
      order = ORDER.ASC,
    } = req.query;
    const { company } = req.decodedToken;

    const startDate = dayjs(transactionDateGreaterThanOrEqualTo);
    const endDate = dayjs(transactionDateLessThanOrEqualTo);
    const daysBetweenDates = endDate.diff(startDate, "day");

    const stockInAndStockOutConditions = {
      transactionDate: {
        [Sequelize.Op.gte]: transactionDateGreaterThanOrEqualTo,
        [Sequelize.Op.lte]: transactionDateLessThanOrEqualTo,
      },
    };

    const stockInData =
      (await StockIn.findAll({
        include: [
          {
            where: { companyId: company.id },
            model: Products,
            as: "product",
            attributes: [],
          },
        ],
        attributes: [
          [Sequelize.literal("DATE(transaction_date)"), "transactionDate"],
          [
            Sequelize.cast(Sequelize.fn("sum", Sequelize.col("quantity")), "INTEGER"),
            "total_quantity",
          ],
          [
            Sequelize.fn("sum", Sequelize.literal('"StockIn"."unit_cost" * quantity')),
            "total_cost_sum",
          ],
        ],
        where: stockInAndStockOutConditions,
        group: [Sequelize.literal("DATE(transaction_date)")],
        order: [[Sequelize.literal("DATE(transaction_date)"), order]],
      })) ?? [];

    const stockOutData =
      (await StockOut.findAll({
        include: [
          {
            where: { companyId: company.id },
            model: Products,
            as: "product",
            attributes: [],
          },
        ],
        attributes: [
          [Sequelize.literal("DATE(transaction_date)"), "transactionDate"],
          [
            Sequelize.cast(Sequelize.fn("sum", Sequelize.col("quantity")), "INTEGER"),
            "total_quantity",
          ],
          [
            Sequelize.fn("sum", Sequelize.literal('"StockOut"."unit_price" * quantity')),
            "total_price_sum",
          ],
        ],
        where: stockInAndStockOutConditions,
        group: [Sequelize.literal("DATE(transaction_date)")],
        order: [[Sequelize.literal("DATE(transaction_date)"), order]],
      })) ?? [];

    const data = {};

    for (let i = 0; i <= daysBetweenDates; i++) {
      const date = startDate.add(i, "day").format("YYYY-MM-DD");
      const {
        dataValues: {
          total_quantity: totalStockInQuantity = 0,
          total_cost_sum: totalCostSum = 0,
        } = {},
      } = stockInData?.find(({ transactionDate } = {}) => transactionDate === date) ?? {};
      const {
        dataValues: {
          total_quantity: totalStockOutQuantity = 0,
          total_price_sum: totalPriceSum = 0,
        } = {},
      } = stockOutData?.find(({ transactionDate } = {}) => transactionDate === date) ?? {};

      data[date] = {
        profit: totalPriceSum - totalCostSum,
        totalStockOutQuantity,
        totalStockInQuantity,
        totalPriceSum,
        totalCostSum,
      };
    }

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStockStatus };
