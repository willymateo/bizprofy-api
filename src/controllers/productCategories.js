const { ProductCategories } = require("../db/models/productCategories");

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

module.exports = { createProductCategory };
