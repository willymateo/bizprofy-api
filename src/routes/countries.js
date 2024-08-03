const { Router } = require("express");

const { getStatesByCountryCode } = require("../controllers/countries/states");
const { getCitiesByStateCode } = require("../controllers/countries/cities");
const { getAllCountries } = require("../controllers/countries");

const router = Router();

router.get("/", getAllCountries);

router.get("/:countryCode/states", getStatesByCountryCode);

router.get("/:countryCode/states/:countryStateCode/cities", getCitiesByStateCode);

module.exports = router;
