import express from "express";
import { createCourse, getCourses, getOrgCourses } from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCourse); // instructor only
router.get("/", getCourses);
router.get("/org", protect, getOrgCourses); // instructor courses

export default router;
