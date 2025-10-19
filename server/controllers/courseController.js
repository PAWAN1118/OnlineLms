import Course from "../models/Course.js";

// Create course (instructor only)
export const createCourse = async (req, res) => {
  const { title, description, price, category, videos } = req.body;
  try {
    const course = await Course.create({
      title,
      description,
      price,
      category,
      videos,
      instructorId: req.user.id,
    });
    res.json(course);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get courses by instructor
export const getOrgCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructorId: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
