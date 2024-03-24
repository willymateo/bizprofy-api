const { Providers } = require("../db/models/providers");

const createProvider = async (req, res, next) => {
  try {
    const idCard = req.body.idCard || null;
    const {
      company: { id: companyId },
    } = req.auth;

    const newProviderInstance = Providers.build({
      ...req.body,
      companyId,
      idCard,
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

module.exports = { createProvider };
