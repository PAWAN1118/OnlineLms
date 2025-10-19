import express from "express";
import { registerStudent, registerOrg, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register/student", registerStudent);
router.post("/register/org", registerOrg);
router.post("/login", login);

export default router;
