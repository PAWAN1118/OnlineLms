import express from "express";
import { enrollCourse, getMyEnrollments } from "../controllers/enrollController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, enrollCourse);

// New route to fetch student's enrollments
router.get("/my", protect, getMyEnrollments);

export default router;
