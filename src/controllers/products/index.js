const { Op } = require("sequelize");

const { ProductCategories } = require("../../db/models/productCategories");
const { Providers } = require("../../db/models/providers");
const { Products } = require("../../db/models/products");
const { ORDER } = require("../../constants");

const getProductById = async (req, res, next) => {
  try {
    const { id = "" } = req.params;

    const product = await Products.findByPk(id, {
      include: [
        { model: ProductCategories, as: "productCategory" },
        { model: Providers, as: "provider" },
      ],
      attributes: { exclude: ["providerId", "productCategoryId"] },
    });

    if (!product) {
      return res.status(404).json({ error: { message: "Product not found" } });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

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
        paranoid: false,
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

const editProductById = async (req, res, next) => {
  try {
    const productCategoryId = req.body.productCategoryId || null;
    const providerId = req.body.providerId || null;
    const code = req.body.code || null;
    const { id = "" } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: { message: "Product not found" } });
    }

    if (productCategoryId) {
      const productCategory = await ProductCategories.findByPk(productCategoryId);

      if (!productCategory) {
        return res.status(404).json({ error: { message: "Product category not found" } });
      }
    }

    if (providerId) {
      const provider = await Providers.findByPk(providerId);

      if (!provider) {
        return res.status(404).json({ error: { message: "Provider not found" } });
      }
    }

    product.set({
      ...req.body,
      productCategoryId,
      providerId,
      code,
    });

    // Validate data
    await product.validate();

    // Save the registers in the DB
    const newProduct = await product.save();

    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const manageProductActivationById = async (req, res, next) => {
  try {
    const { force = false, activate = true } = req.body;
    const { id = "" } = req.params;

    const product = await Products.findByPk(id, {
      paranoid: false,
    });

    if (!product) {
      return res.status(404).json({ error: { message: "Product not found" } });
    }

    if (activate) {
      await product.restore();
    } else {
      await product.destroy({ force });
    }

    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  manageProductActivationById,
  editProductById,
  getProductById,
  createProduct,
  getProducts,
};
