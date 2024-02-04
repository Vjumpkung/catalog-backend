import express from "express";
import { login, me, register } from "../services/auth.service.js";
import { has_admin, requireLogin } from "../utils/authguard.js";

const router = express.Router();

router.post("/login", await login);
router.post("/register", await has_admin, await register);
router.get("/me", await requireLogin, await me);

export default router;
