import express from "express";
import { login, me, register } from "../services/auth.service.js";
import { has_admin, requireLogin } from "../utils/authguard.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", has_admin, register);
router.get("/me", requireLogin, me);

export default router;
