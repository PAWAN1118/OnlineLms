import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();

const CLIENT_URL=process.env.CLIENT_URL || "http://localhost:3000";
app.use(cors({
    origin:CLIENT_URL,
    credentials:true
}));
app.use(express.json());
// Routes
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/payment", paymentRoutes);

app.get("/", (req, res) => res.send("✅ Server running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
