const { Warehouses } = require("../db/models/warehouses");

const createWarehouse = async (req, res, next) => {
  try {
    const code = req.body.code || null;
    const {
      company: { id: companyId },
    } = req.auth;

    const newWarehouseInstance = Warehouses.build({
      ...req.body,
      companyId,
      code,
    });

    // Validate data
    await newWarehouseInstance.validate();

    // Save the registers in the DB
    const newWarehouse = await newWarehouseInstance.save();

    res.status(201).json(newWarehouse);
  } catch (error) {
    next(error);
  }
};

module.exports = { createWarehouse };
