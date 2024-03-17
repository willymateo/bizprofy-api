const { Router } = require("express");

const { validateCreateProviderSchema } = require("../middlewares/validateAJVSchema/providers");
const { createProvider } = require("../controllers/providers");

const router = Router();

router.post("/", validateCreateProviderSchema, createProvider);

module.exports = router;
