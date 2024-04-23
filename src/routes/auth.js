const { Router } = require("express");

const { createToken } = require("../middlewares/authJwt");
const { login, signUp } = require("../controllers/auth");
const {
  validateSignUpSchema,
  validateLoginSchema,
} = require("../middlewares/validateAJVSchema/auth");

const router = Router();

router.post("/login", validateLoginSchema, login, createToken);
router.post("/signUp", validateSignUpSchema, signUp);

module.exports = router;
