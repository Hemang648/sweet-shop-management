import { Router } from "express";
import {
  createSweet,
  getSweets,
  searchSweet,
  updateSweet,
  deleteSweet,
  purchaseSweetController,
  restockSweetController,
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
router.post("/:id/purchase", purchaseSweetController);
router.post("/:id/restock", requireAdmin, restockSweetController);

export default router;
