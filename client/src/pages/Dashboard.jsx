import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch enrolled courses
        const resEnroll = await API.get("/enroll/my");
        setEnrollments(resEnroll.data);

        const enrolledIds = resEnroll.data.map((e) => e.course._id);

        // 2️⃣ Fetch free courses (price = 0)
        const resFree = await API.get("/courses/free");
        setFreeCourses(resFree.data.filter(c => !enrolledIds.includes(c._id)));

        // 3️⃣ Fetch recommended paid courses (price > 0)
        const resAll = await API.get("/courses");
        const recommended = resAll.data.filter(
          (c) => c.price > 0 && !enrolledIds.includes(c._id)
        );
        setRecommendedCourses(recommended);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const enrollFreeCourse = async (courseId) => {
    try {
      await API.post(`/enroll/${courseId}`);
      alert("Enrolled in free course!");
      const resEnroll = await API.get("/enroll/my");
      setEnrollments(resEnroll.data);
      setFreeCourses((prev) => prev.filter(c => c._id !== courseId));
    } catch (err) {
      console.error(err);
      alert("Failed to enroll");
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">My Dashboard</h1>

      {/* --- Enrolled Courses --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">My Enrolled Courses</h2>
        {enrollments.length === 0 ? (
          <p>You have not enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((enroll) => (
              <div key={enroll._id} className="border rounded-lg p-4 shadow hover:shadow-xl transition">
                <h3 className="font-bold text-xl">{enroll.course.title}</h3>
                <p className="text-gray-700 mt-1">{enroll.course.description}</p>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Category: {enroll.course.category}</span>
                  <span>Price: ₹{enroll.course.price}</span>
                </div>
                <div className="mt-2">
                  {enroll.course.videos.map((v, i) => (
                    <video key={i} src={v.url} controls className="w-full mt-2 rounded" />
                  ))}
                </div>

                {/* --- Progress Bar --- */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded h-4">
                    <div
                      className="bg-blue-600 h-4 rounded"
                      style={{ width: `${enroll.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Progress: {enroll.progress}% {enroll.completed && "✅ Completed"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Free Courses --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-700">Free Courses</h2>
        {freeCourses.length === 0 ? (
          <p>No free courses available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freeCourses.map((course) => (
              <div key={course._id} className="border rounded-lg p-4 shadow hover:shadow-xl transition">
                <h3 className="font-bold text-xl">{course.title}</h3>
                <p className="text-gray-700 mt-1">{course.description}</p>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Category: {course.category}</span>
                  <span>Price: Free</span>
                  <span>Videos: {course.videos.length}</span>
                </div>
                <button
                  className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                  onClick={() => enrollFreeCourse(course._id)}
                >
                  Enroll for Free
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Recommended Paid Courses --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Recommended Paid Courses</h2>
        {recommendedCourses.length === 0 ? (
          <p>No recommended courses at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCourses.map((course) => (
              <div key={course._id} className="border rounded-lg p-4 shadow hover:shadow-xl transition">
                <h3 className="font-bold text-xl">{course.title}</h3>
                <p className="text-gray-700 mt-1">{course.description}</p>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Category: {course.category}</span>
                  <span>Price: ₹{course.price}</span>
                  <span>Videos: {course.videos.length}</span>
                </div>
                <button
                  className="mt-2 bg-green-600 text-white p-2 rounded hover:bg-green-700"
                  onClick={async () => {
                    try {
                      await API.post(`/enroll/${course._id}`);
                      alert("Enrolled successfully!");
                      const resEnroll = await API.get("/enroll/my");
                      setEnrollments(resEnroll.data);
                      setRecommendedCourses((prev) => prev.filter(c => c._id !== course._id));
                    } catch (err) {
                      console.error(err);
                      alert("Failed to enroll");
                    }
                  }}
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
