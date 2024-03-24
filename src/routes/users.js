const { Router } = require("express");

const { createUser, getUsers } = require("../controllers/users");
const { verifyToken } = require("../middlewares/authJwt");
const {
  validateCreateUserSchema,
  validateGetUsersSchema,
} = require("../middlewares/validateAJVSchema/users");

const router = Router();

router.get("/", validateGetUsersSchema, verifyToken, getUsers);

router.post("/", validateCreateUserSchema, verifyToken, createUser);

module.exports = router;
