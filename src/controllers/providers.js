const Sequelize = require("sequelize");

const { Providers } = require("../db/models/providers");
const { ORDER } = require("../constants");

const getProviderById = async (req, res, next) => {
  try {
    const { id = "" } = req.params;

    const provider = await Providers.findByPk(id);

    if (!provider) {
      return res.status(404).json({ error: { message: "Provider not found" } });
    }

    res.status(200).json(provider);
  } catch (err) {
    next(err);
  }
};

const getProviders = async (req, res, next) => {
  try {
    const { company } = req.decodedToken;
    const {
      orderByField = "createdAt",
      order = ORDER.DESC,
      limit = 50,
      offset = 0,
      q = "",
    } = req.query;

    const bdResult =
      (await Providers.findAndCountAll({
        where: {
          companyId: company.id,
          ...(q && {
            [Sequelize.Op.or]: [
              {
                idCard: {
                  [Sequelize.Op.iLike]: `%${q}%`,
                },
              },
              {
                firstNames: {
                  [Sequelize.Op.iLike]: `%${q}%`,
                },
              },
              {
                lastNames: {
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

const createProvider = async (req, res, next) => {
  try {
    const idCard = req.body.idCard || null;
    const email = req.body.email || null;
    const {
      company: { id: companyId },
    } = req.auth;

    if (idCard) {
      const providerWithSameIdCard = await Providers.findOne({
        where: {
          companyId,
          idCard,
        },
      });

      if (providerWithSameIdCard) {
        return res
          .status(400)
          .json({ error: { message: "Provider with the same ID card already exists" } });
      }
    }

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

const editProviderById = async (req, res, next) => {
  try {
    const idCard = req.body.idCard || null;
    const email = req.body.email || null;
    const { id = "" } = req.params;
    const {
      company: { id: companyId },
    } = req.auth;

    const provider = await Providers.findByPk(id);

    if (!provider) {
      return res.status(404).json({ error: { message: "Provider not found" } });
    }

    if (idCard) {
      const providerWithSameIdCard = await Providers.findOne({
        where: {
          companyId,
          id: {
            [Sequelize.Op.not]: id,
          },
          idCard,
        },
      });

      if (providerWithSameIdCard) {
        return res
          .status(400)
          .json({ error: { message: "Provider with the same ID card already exists" } });
      }
    }

    provider.set({
      ...req.body,
      idCard,
      email,
    });

    // Validate data
    await provider.validate();

    // Save the registers in the DB
    const newProvider = await provider.save();

    res.status(200).json(newProvider);
  } catch (error) {
    next(error);
  }
};

const manageProviderActivationById = async (req, res, next) => {
  try {
    const { force = false, activate = true } = req.body;
    const { id = "" } = req.params;

    const provider = await Providers.findByPk(id, {
      paranoid: false,
    });

    if (!provider) {
      return res.status(404).json({ error: { message: "Provider not found" } });
    }

    if (activate) {
      await provider.restore();
    } else {
      await provider.destroy({ force });
    }

    return res.status(200).send(provider);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  manageProviderActivationById,
  editProviderById,
  getProviderById,
  createProvider,
  getProviders,
};
