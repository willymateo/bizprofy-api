const { Router } = require("express");

const {
  validateProviderActivationSchema,
  validateCreateProviderSchema,
  validateGetProvidersSchema,
  validateEditProviderSchema,
} = require("../middlewares/validateAJVSchema/providers");
const { verifyToken } = require("../middlewares/authJwt");
const {
  manageProviderActivationById,
  editProviderById,
  getProviderById,
  createProvider,
  getProviders,
} = require("../controllers/providers");

const router = Router();

router.get("/:id", verifyToken, getProviderById);
router.patch("/:id", validateEditProviderSchema, verifyToken, editProviderById);
router.patch(
  "/:id/activation",
  validateProviderActivationSchema,
  verifyToken,
  manageProviderActivationById,
);

router.get("/", validateGetProvidersSchema, verifyToken, getProviders);
router.post("/", validateCreateProviderSchema, verifyToken, createProvider);

module.exports = router;
