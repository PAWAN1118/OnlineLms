import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollCourse = async (req, res) => {
  const { courseId } = req.body;

  const exists = await Enrollment.findOne({ userId: req.user.id, courseId });
  if (exists) return res.status(400).json({ msg: "Already enrolled" });

  const enroll = await Enrollment.create({ userId: req.user.id, courseId });
  res.json(enroll);
};

// Fetch student's enrollments
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id }).populate("courseId");
    // map to include course data
    const mapped = enrollments.map(e => ({
      ...e._doc,
      course: e.courseId,
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
