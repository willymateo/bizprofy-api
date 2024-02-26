const { Companies } = require("../db/models/companies");
const { Products } = require("../db/models/products");

const getProducts = async (req, res, next) => {
  try {
    const products = await Products.findAll();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { companyId = "" } = req.body;

    const company = await Companies.findOne({ where: { id: companyId } });

    if (!company) {
      return res.status(404).send({ error: { message: "Company not found" } });
    }

    const newProductInstance = Products.build(req.body);

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
