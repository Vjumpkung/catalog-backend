import express from "express";
import { requireLogin } from "../utils/authguard.js";
import {
  create_product,
  update_product,
  get_products,
  get_products_by_id,
  change_status_product,
  delete_product,
} from "../services/products.service.js";
const router = express.Router();

router.get("/", get_products);
router.get("/:id", get_products_by_id);
router.post("/", create_product);
router.patch("/:id/update", update_product);
router.patch("/:id", change_status_product);
router.delete("/:id", delete_product);

export default router;
