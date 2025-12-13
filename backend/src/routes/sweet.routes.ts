import { Router } from "express";
import {
  createSweet,
  getSweets,
  searchSweet,
  updateSweet,
  deleteSweet,
} from "../controllers/sweet.controller";
import { authenticate  } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.use(authenticate);

router.post("/", createSweet);
router.get("/", getSweets);
router.get("/search", searchSweet);
router.put("/:id", updateSweet);
router.delete("/:id", requireAdmin, deleteSweet);

export default router;
