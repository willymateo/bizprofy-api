const { Warehouses } = require("../db/models/warehouses");
const { ORDER } = require("../constants");

const getWarehouses = async (req, res, next) => {
  try {
    const { orderByField = "createdAt", order = ORDER.DESC, limit = 50, offset = 0 } = req.query;
    const { company } = req.decodedToken;

    const bdResult = await Warehouses.findAndCountAll({
      where: { companyId: company.id },
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

module.exports = { createWarehouse, getWarehouses };
