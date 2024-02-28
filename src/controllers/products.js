const { Products } = require("../db/models/products");

const getProducts = async (req, res, next) => {
  try {
    const { company } = req.auth;
    const products = await company.getProducts({});

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { company } = req.auth;

    const newProductInstance = Products.build({
      ...req.body,
      companyId: company.id,
    });

    // Validate data
    await newProductInstance.validate();

    // Save the registers in the DB
    await newProductInstance.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct, getProducts };
