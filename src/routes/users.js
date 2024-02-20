const { Router } = require("express");

const { validateCreateUserSchema } = require("../middlewares/validateAJVSchema/users");
const { createToken } = require("../middlewares/authJwt");
const { createUser } = require("../controllers/users");

const router = Router();

router.post("/", validateCreateUserSchema, createUser, createToken);

module.exports = router;
