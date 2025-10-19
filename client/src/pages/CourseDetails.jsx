import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);

  const handlePay = async () => {
    if (!course) return alert("Course data not loaded");
    try {
      const res = await API.post("/payment/checkout", { course });
      window.location.href = res.data.url; // redirect to Stripe
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Payment failed");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      <p>{course.description}</p>
      <p>Price: ${course.price}</p>
      {course.videos?.map((v, i) => (
        <video key={i} src={v.url} controls className="w-full mt-2" />
      ))}
      <button
        onClick={handlePay}
        className="bg-blue-600 text-white p-2 rounded mt-4"
      >
        Pay Now
      </button>
    </div>
  );
}
