const { State } = require("country-state-city");

const getStatesByCountryCode = async (req, res, next) => {
  try {
    const { countryCode } = req.params;

    const states = State.getStatesOfCountry(countryCode);

    return res.status(200).json(states);
  } catch (error) {
    next(error);
  }
};

module.exports = { getStatesByCountryCode };
