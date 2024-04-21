const { Op } = require("sequelize");

const { ProductCategories } = require("../db/models/productCategories");
const { Providers } = require("../db/models/providers");
const { Products } = require("../db/models/products");
const { ORDER } = require("../constants");

const getProducts = async (req, res, next) => {
  try {
    const { company } = req.decodedToken;
    const {
      unitPriceGreaterThanOrEqualTo = 0,
      unitCostGreaterThanOrEqualTo = 0,
      unitPriceLessThanOrEqualTo,
      unitCostLessThanOrEqualTo,
      order = ORDER.DESC,
      limit = 50,
      offset = 0,
      q = "",
    } = req.query;

    const bdResult =
      (await Products.findAndCountAll({
        include: [
          { model: ProductCategories, as: "productCategory" },
          { model: Providers, as: "provider" },
        ],
        attributes: { exclude: ["providerId", "productCategoryId"] },
        where: {
          companyId: company.id,
          ...(q && {
            [Op.or]: [
              {
                name: {
                  [Op.iLike]: `%${q}%`,
                },
              },
              {
                code: {
                  [Op.iLike]: `%${q}%`,
                },
              },
              {
                description: {
                  [Op.iLike]: `%${q}%`,
                },
              },
            ],
          }),
          ...((unitPriceLessThanOrEqualTo || unitPriceGreaterThanOrEqualTo) && {
            unitPrice: {
              ...(unitPriceLessThanOrEqualTo && {
                [Op.lte]: unitPriceLessThanOrEqualTo,
              }),
              ...(unitPriceGreaterThanOrEqualTo && {
                [Op.gte]: unitPriceGreaterThanOrEqualTo,
              }),
            },
          }),
          ...((unitCostLessThanOrEqualTo || unitCostGreaterThanOrEqualTo) && {
            unitCost: {
              ...(unitCostLessThanOrEqualTo && {
                [Op.lte]: unitCostLessThanOrEqualTo,
              }),
              ...(unitCostGreaterThanOrEqualTo && {
                [Op.gte]: unitCostGreaterThanOrEqualTo,
              }),
            },
          }),
        },
        offset,
        limit,
        order: [["createdAt", order]],
      })) ?? {};

    res.status(200).json(bdResult);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const productCategoryId = req.body.productCategoryId || null;
    const providerId = req.body.providerId || null;
    const code = req.body.code || null;
    const {
      company: { id: companyId },
    } = req.auth;

    const newProductInstance = Products.build({
      ...req.body,
      productCategoryId,
      providerId,
      companyId,
      code,
    });

    // Validate data
    await newProductInstance.validate();

    // Save the registers in the DB
    const newProduct = await newProductInstance.save();

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

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
            [Op.iLike]: `%${q}%`,
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

module.exports = {
  editProductCategoryById,
  getProductCategoryById,
  createProductCategory,
  getProductCategories,
  createProduct,
  getProducts,
};
