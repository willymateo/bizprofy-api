const { Router } = require("express");

const { validateLoginSchema } = require("../middlewares/validateAJVSchema/auth");
const { login } = require("../controllers/auth");

const router = Router();

router.post("/login", validateLoginSchema, login);

module.exports = router;
