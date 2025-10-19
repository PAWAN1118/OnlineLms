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

// ✅ CORS setup — allow only frontend domains
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,        // Vercel frontend
      "http://localhost:3000"          // Local testing (optional)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/payment", paymentRoutes);

// ✅ Default route
app.get("/", (req, res) => res.send("✅ Server running..."));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
