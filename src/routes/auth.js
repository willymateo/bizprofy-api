import { validateLoginDTO } from "../middlewares/validateLoginDTO";
import { login } from "../controllers/auth.controller";
import { createToken } from "../middlewares/authJwt";
import { Router } from "express";

const router = Router();

router.post("/login", validateLoginDTO, login, createToken);

export default router;
