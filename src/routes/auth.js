const { Router } = require("express");

const { login, signUp, verifyEmail } = require("../controllers/auth");
const { createToken } = require("../middlewares/authJwt");
const {
  validateEmailVerificationSchema,
  validateSignUpSchema,
  validateLoginSchema,
} = require("../middlewares/validateAJVSchema/auth");

const router = Router();

router.patch("/email-verification", validateEmailVerificationSchema, verifyEmail);

router.post("/login", validateLoginSchema, login, createToken);

router.post("/signUp", validateSignUpSchema, signUp);

module.exports = router;
