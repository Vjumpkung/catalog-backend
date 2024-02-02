import express from "express";
import { requireLogin } from "../utils/authguard.js";
import {
  create_choice,
  delete_choice,
  get_choice_by_id,
  get_choices,
  update_choice,
} from "../services/choices.service.js";
const router = express.Router();

router.get("/", requireLogin, get_choices);
router.get("/:id", requireLogin, get_choice_by_id);
router.post("/", requireLogin, create_choice);
router.patch("/:id", requireLogin, update_choice);
router.delete("/:id", requireLogin, delete_choice);

export default router;
