import { useEffect, useState } from "react";
import API from "../api/api";
import axios from "axios";

export default function OrgDashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    videos: [],
  });
  const [uploading, setUploading] = useState(false);

  // Fetch all courses created by this org
  useEffect(() => {
    const fetchOrgCourses = async () => {
      try {
        const res = await API.get("/courses/org");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load org courses:", err);
      }
    };
    fetchOrgCourses();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/video/upload`,
        data
      );

      setForm((prev) => ({
        ...prev,
        videos: [...prev.videos, { title: file.name, url: res.data.secure_url }],
      }));

      alert("Video uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Video upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/courses", form);
      alert("Course created successfully!");
      setForm({ title: "", description: "", price: "", category: "", videos: [] });
      const res = await API.get("/courses/org");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to create course");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">
        Organization Dashboard
      </h1>

      {/* --- Course Creation Form --- */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 space-y-3 bg-white p-6 rounded shadow-lg max-w-xl"
      >
        <h2 className="text-xl font-semibold mb-2">Add New Course</h2>
        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="block mt-2"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded w-full hover:bg-green-700 transition"
          disabled={uploading}
        >
          {uploading ? "Please wait..." : "Create Course"}
        </button>
      </form>

      {/* --- Courses List --- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
        {courses.length === 0 ? (
          <p>No courses created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((c) => (
              <div
                key={c._id}
                className="border rounded-lg p-4 shadow hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <h3 className="font-bold text-xl">{c.title}</h3>
                <p className="text-gray-700 mt-1">{c.description}</p>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Category: {c.category}</span>
                  <span>Price: ₹{c.price}</span>
                  <span>Videos: {c.videos.length}</span>
                </div>
                <div className="mt-2">
                  {c.videos.map((v, i) => (
                    <video
                      key={i}
                      src={v.url}
                      controls
                      className="w-full mt-2 rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
