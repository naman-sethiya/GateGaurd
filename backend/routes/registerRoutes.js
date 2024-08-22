import { Router } from "express";
import { createInEntry, createOutEntry } from "../controllers/registerController.js";

const router = Router();

router.post('/create-out-entry',createOutEntry);
router.patch('/create-in-entry',createInEntry);

export default router;