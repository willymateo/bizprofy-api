const { Op } = require("sequelize");

const { ProductCategories } = require("../db/models/productCategories");
const { Providers } = require("../db/models/providers");
const { Products } = require("../db/models/products");
const { ORDER } = require("../constants");

const getProducts = async (req, res, next) => {
  try {
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
    const { company } = req.auth;

    const products = await company.getProducts({
      include: [
        { model: ProductCategories, as: "productCategory" },
        { model: Providers, as: "provider" },
      ],
      where: {
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
    });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const code = req.body.code || null;
    const {
      company: { id: companyId },
    } = req.auth;

    const newProductInstance = Products.build({
      ...req.body,
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

module.exports = { createProduct, getProducts };
