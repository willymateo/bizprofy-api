const Sequelize = require("sequelize");

const { Warehouses } = require("../db/models/warehouses");
const { ORDER } = require("../constants");

const getWarehouseById = async (req, res, next) => {
  try {
    const { id = "" } = req.params;

    const warehouse = await Warehouses.findByPk(id);

    if (!warehouse) {
      return res.status(404).json({ error: { message: "Warehouse not found" } });
    }

    res.status(200).json(warehouse);
  } catch (err) {
    next(err);
  }
};

const getWarehouses = async (req, res, next) => {
  try {
    const {
      orderByField = "createdAt",
      order = ORDER.DESC,
      limit = 50,
      offset = 0,
      q = "",
    } = req.query;
    const { company } = req.decodedToken;

    const bdResult =
      (await Warehouses.findAndCountAll({
        where: {
          companyId: company.id,
          ...(q && {
            [Sequelize.Op.or]: [
              {
                name: {
                  [Sequelize.Op.iLike]: `%${q}%`,
                },
              },
              {
                code: {
                  [Sequelize.Op.iLike]: `%${q}%`,
                },
              },
            ],
          }),
        },
        paranoid: false,
        offset,
        limit,
        order: [[orderByField, order]],
      })) ?? {};

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

    if (code) {
      const warehouseWithSameCode = await Warehouses.findOne({
        where: {
          companyId,
          code,
        },
      });

      if (warehouseWithSameCode) {
        return res
          .status(400)
          .json({ error: { message: "Warehouse with the same code already exists" } });
      }
    }

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

const editWarehouseById = async (req, res, next) => {
  try {
    const code = req.body.code || null;
    const { id = "" } = req.params;
    const {
      company: { id: companyId },
    } = req.auth;

    const warehouse = await Warehouses.findByPk(id);

    if (!warehouse) {
      return res.status(404).json({ error: { message: "Warehouse not found" } });
    }

    if (code) {
      const warehouseWithSameCode = await Warehouses.findOne({
        where: {
          id: {
            [Sequelize.Op.ne]: id,
          },
          companyId,
          code,
        },
      });

      if (warehouseWithSameCode) {
        return res
          .status(400)
          .json({ error: { message: "Warehouse with the same code already exists" } });
      }
    }

    warehouse.set({
      ...req.body,
      code,
    });

    // Validate data
    await warehouse.validate();

    // Save the registers in the DB
    const newWarehouse = await warehouse.save();

    res.status(201).json(newWarehouse);
  } catch (error) {
    next(error);
  }
};

const manageWarehouseActivationById = async (req, res, next) => {
  try {
    const { force = false, activate = true } = req.body;
    const { id = "" } = req.params;

    const warehouse = await Warehouses.findByPk(id, {
      paranoid: false,
    });

    if (!warehouse) {
      return res.status(404).json({ error: { message: "Warehouse not found" } });
    }

    if (activate) {
      await warehouse.restore();
    } else {
      await warehouse.destroy({ force });
    }

    return res.status(200).send(warehouse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  manageWarehouseActivationById,
  editWarehouseById,
  getWarehouseById,
  createWarehouse,
  getWarehouses,
};
