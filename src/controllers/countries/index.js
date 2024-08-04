const { Country } = require("country-state-city");

const getAllCountries = async (req, res, next) => {
  try {
    const countries = Country.getAllCountries();

    return res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCountries };
