import express from "express";
import {
  create_user,
  get_users,
  update_user,
  delete_user,
} from "../services/users.service.js";
import { checkOldpassWord, requireLogin } from "../utils/authguard.js";
const router = express.Router();

router.get("/", requireLogin, get_users);
router.post("/", requireLogin, create_user);
router.patch("/:id", requireLogin, checkOldpassWord, update_user);
router.delete("/:id", requireLogin, delete_user);

export default router;
