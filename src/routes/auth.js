const { Router } = require("express");

const { validateLoginSchema } = require("../middlewares/validateAJVSchema/auth");
const { createToken } = require("../middlewares/authJwt");
const { login } = require("../controllers/auth");

const router = Router();

router.post("/login", validateLoginSchema, login, createToken);

module.exports = router;
