import { useEffect, useState } from "react";
import API from "../api/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  const handlePay = async (course) => {
    try {
      const res = await API.post("/payment/checkout", { course });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Payment failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div key={c._id} className="border rounded p-4 shadow">
              <h2 className="font-bold text-lg">{c.title}</h2>
              <p>{c.description}</p>
              <p>Price: {c.price}</p>
              <p>Category: {c.category}</p>
              {c.videos.map((v, i) => (
                <video key={i} src={v.url} controls className="w-full mt-2" />
              ))}

              {/* Only students can see pay/enroll button */}
              {role === "student" && (
                <button
                  onClick={() => handlePay(c)}
                  className="bg-blue-600 text-white p-2 rounded mt-2"
                >
                  Pay / Enroll
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
