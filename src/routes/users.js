const { Router } = require("express");

const { createUser, getUsers, getUserById, editUserById } = require("../controllers/users");
const { verifyToken } = require("../middlewares/authJwt");
const {
  validateCreateUserSchema,
  validateGetUsersSchema,
  validateEditUserSchema,
} = require("../middlewares/validateAJVSchema/users");

const router = Router();

router.get("/:id", verifyToken, getUserById);
router.patch("/:id", validateEditUserSchema, verifyToken, editUserById);
router.get("/", validateGetUsersSchema, verifyToken, getUsers);
router.post("/", validateCreateUserSchema, verifyToken, createUser);

module.exports = router;
