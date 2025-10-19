import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:3000",              // Local React app
  "https://online-lms.vercel.app",      // Deployed frontend on Vercel
  "https://online-lms-py.vercel.app"    // Optional if backend/frontend share subdomain
];

// ✅ CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/payment", paymentRoutes);

// ✅ Default route
app.get("/", (req, res) => res.send("✅ Server running successfully..."));

// ✅ Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

