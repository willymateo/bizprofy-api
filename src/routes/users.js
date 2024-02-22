const { Router } = require("express");

const { validateCreateUserSchema } = require("../middlewares/validateAJVSchema/users");
const { createUser } = require("../controllers/users");

const router = Router();

router.post("/", validateCreateUserSchema, createUser);

module.exports = router;
