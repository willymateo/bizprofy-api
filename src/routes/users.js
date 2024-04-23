const { Router } = require("express");

const { verifyToken } = require("../middlewares/authJwt");
const {
  validateUserActivationSchema,
  validateCreateUserSchema,
  validateGetUsersSchema,
  validateEditUserSchema,
} = require("../middlewares/validateAJVSchema/users");
const {
  manageUserActivationById,
  editUserById,
  getUserById,
  createUser,
  getUsers,
} = require("../controllers/users");

const router = Router();

router.get("/:id", verifyToken, getUserById);
router.patch("/:id", validateEditUserSchema, verifyToken, editUserById);
router.patch(
  "/:id/activation",
  validateUserActivationSchema,
  verifyToken,
  manageUserActivationById,
);

router.get("/", validateGetUsersSchema, verifyToken, getUsers);
router.post("/", validateCreateUserSchema, verifyToken, createUser);

module.exports = router;
