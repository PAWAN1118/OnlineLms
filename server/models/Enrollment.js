import mongoose from "mongoose";

const enrollSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});

export default mongoose.model("Enrollment", enrollSchema);
