import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deposit, withdraw, transfer } from "../controllers/action.controller.js";

const router = express.Router();

router.put("/withdraw", protectRoute, withdraw)
router.put("/deposit", protectRoute, deposit)
router.put("/transfer", protectRoute, transfer)

export default router;