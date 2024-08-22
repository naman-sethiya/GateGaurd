import { Router } from "express";
import { getEntriesByDate, getOutStudents, getStudents } from "../controllers/homeController.js";

const router = Router();

router.get('/get-students',getStudents);
router.get('/get-out-students',getOutStudents);
router.post('/get-entries-by-date',getEntriesByDate);

export default router;