const { Providers } = require("../db/models/providers");
const { ORDER } = require("../constants");

const getProviders = async (req, res, next) => {
  try {
    const { orderByField = "createdAt", order = ORDER.DESC, limit = 50, offset = 0 } = req.query;
    const { company } = req.decodedToken;

    const bdResult = await Providers.findAndCountAll({
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

const createProvider = async (req, res, next) => {
  try {
    const idCard = req.body.idCard || null;
    const email = req.body.email || null;
    const {
      company: { id: companyId },
    } = req.auth;

    const newProviderInstance = Providers.build({
      ...req.body,
      companyId,
      idCard,
      email,
    });

    // Validate data
    await newProviderInstance.validate();

    // Save the registers in the DB
    const newProvider = await newProviderInstance.save();

    res.status(201).json(newProvider);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProvider, getProviders };
