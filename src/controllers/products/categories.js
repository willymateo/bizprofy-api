const Sequelize = require("sequelize");

const { ProductCategories } = require("../../db/models/productCategories");
const { Products } = require("../../db/models/products");
const { StockOut } = require("../../db/models/stockOut");
const { STOCK_STATUS_FIELDS } = require("./constants");
const { ORDER } = require("../../constants");

const getProductCategoryById = async (req, res, next) => {
  try {
    const { id = "" } = req.params;

    const productCategory = await ProductCategories.findByPk(id);

    if (!productCategory) {
      return res.status(404).json({ error: { message: "Product category not found" } });
    }

    res.status(200).json(productCategory);
  } catch (err) {
    next(err);
  }
};

const getProductCategories = async (req, res, next) => {
  try {
    const { company } = req.decodedToken;
    const {
      orderByField = "createdAt",
      order = ORDER.DESC,
      limit = 50,
      offset = 0,
      q = "",
    } = req.query;

    const bdResult = await ProductCategories.findAndCountAll({
      where: {
        companyId: company.id,
        ...(q && {
          name: {
            [Sequelize.Op.iLike]: `%${q}%`,
          },
        }),
      },
      paranoid: false,
      offset,
      limit,
      order: [[orderByField, order]],
    });

    res.status(200).json(bdResult);
  } catch (err) {
    next(err);
  }
};

const getProductCategoriesStockStatus = async (req, res, next) => {
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
            include: [{ model: ProductCategories, as: "productCategory", attributes: [] }],
            where: { companyId: company.id },
            model: Products,
            attributes: [],
            as: "product",
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
          [Sequelize.literal('"product->productCategory"."name"'), "productCategoryName"],
          [Sequelize.literal('"product->productCategory"."id"'), "productCategoryId"],
        ],
        where: {
          transactionDate: {
            [Sequelize.Op.gte]: transactionDateGreaterThanOrEqualTo,
            [Sequelize.Op.lte]: transactionDateLessThanOrEqualTo,
          },
        },
        group: ["product.productCategory.id"],
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
            productCategoryId,
            productCategoryName,
          } = {},
        } = {}) => ({
          productCategory: {
            name: productCategoryName,
            id: productCategoryId,
          },
          totalQuantity,
          totalPriceSum,
        }),
      ) ?? [];

    return res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

const createProductCategory = async (req, res, next) => {
  try {
    const {
      company: { id: companyId },
    } = req.auth;

    const newProductCategoryInstance = ProductCategories.build({
      ...req.body,
      companyId,
    });

    // Validate data
    await newProductCategoryInstance.validate();

    // Save the registers in the DB
    const newProductCategory = await newProductCategoryInstance.save();

    res.status(201).json(newProductCategory);
  } catch (error) {
    next(error);
  }
};

const editProductCategoryById = async (req, res, next) => {
  try {
    const { id = "" } = req.params;

    const productCategory = await ProductCategories.findByPk(id);

    if (!productCategory) {
      return res.status(404).json({ error: { message: "Product category not found" } });
    }

    productCategory.set(req.body);

    // Validate data
    await productCategory.validate();

    // Save the registers in the DB
    const newProductCategory = await productCategory.save();

    res.status(200).json(newProductCategory);
  } catch (error) {
    next(error);
  }
};

const manageProductCategoryActivationById = async (req, res, next) => {
  try {
    const { force = false, activate = true } = req.body;
    const { id = "" } = req.params;

    const productCategory = await ProductCategories.findByPk(id, {
      paranoid: false,
    });

    if (!productCategory) {
      return res.status(404).json({ error: { message: "Product category not found" } });
    }

    if (activate) {
      await productCategory.restore();
    } else {
      await productCategory.destroy({ force });
    }

    return res.status(200).send(productCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  manageProductCategoryActivationById,
  getProductCategoriesStockStatus,
  editProductCategoryById,
  getProductCategoryById,
  createProductCategory,
  getProductCategories,
};
