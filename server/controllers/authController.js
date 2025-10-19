// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register student
export const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password, role: "student" });
    await user.save();
    res.json({ msg: "Student registered successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Register organization
export const registerOrg = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const org = new User({ name, email, password, role: "instructor" });
    await org.save();
    res.json({ msg: "Organization registered successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Login (student or org)
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
