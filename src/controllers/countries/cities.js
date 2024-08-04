const { City } = require("country-state-city");

const getCitiesByStateCode = async (req, res, next) => {
  try {
    const { countryStateCode, countryCode } = req.params;

    const cities = City.getCitiesOfState(countryCode, countryStateCode);

    return res.status(200).json(cities);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCitiesByStateCode };
