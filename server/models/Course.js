import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: Number,
  videos: [{ title: String, url: String }],
  category: String,
  rating: { type: Number, default: 0 },
});

export default mongoose.model("Course", courseSchema);
