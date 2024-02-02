import express from "express";
import { get_settings, update_settings } from "../services/settings.service.js";
const router = express.Router();

router.get("/", get_settings);

router.patch("/", update_settings);

export default router;
