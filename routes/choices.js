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

router.get("/", await requireLogin, await get_choices);
router.get("/:id", await requireLogin, await get_choice_by_id);
router.post("/", await requireLogin, await create_choice);
router.patch("/:id", await requireLogin, await update_choice);
router.delete("/:id", await requireLogin, await delete_choice);

export default router;
