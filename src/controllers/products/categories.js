const { Op } = require("sequelize");

const { ProductCategories } = require("../../db/models/productCategories");
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
};
