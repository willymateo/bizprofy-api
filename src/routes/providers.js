const { Router } = require("express");

const { createProvider, getProviders } = require("../controllers/providers");
const { verifyToken } = require("../middlewares/authJwt");
const {
  validateCreateProviderSchema,
  validateGetProvidersSchema,
} = require("../middlewares/validateAJVSchema/providers");

const router = Router();

router.get("/", validateGetProvidersSchema, verifyToken, getProviders);
router.post("/", validateCreateProviderSchema, verifyToken, createProvider);

module.exports = router;
