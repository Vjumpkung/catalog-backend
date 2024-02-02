import express from "express";
import { get_settings, update_settings } from "../services/settings.service.js";
import { requireLogin } from "../utils/authguard.js";
const router = express.Router();

router.get("/", get_settings);

router.patch("/", requireLogin, update_settings);

export default router;
