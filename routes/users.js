import express from "express";
import {
  create_user,
  get_users,
  update_user,
  delete_user,
} from "../services/users.service.js";
import { checkOldpassWord, requireLogin } from "../utils/authguard.js";
const router = express.Router();

router.get("/", await requireLogin, await get_users);
router.post("/", await requireLogin, await create_user);
router.patch(
  "/:id",
  await requireLogin,
  await checkOldpassWord,
  await update_user
);
router.delete("/:id", await requireLogin, await delete_user);

export default router;
