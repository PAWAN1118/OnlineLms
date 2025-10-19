import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default to student
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Select correct endpoint based on role
      const endpoint = form.role === "student" ? "/auth/register/student" : "/auth/register/org";
      const res = await API.post(endpoint, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <div className="flex items-center space-x-2">
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={form.role === "student"}
              onChange={handleChange}
              className="mr-1"
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="instructor"
              checked={form.role === "instructor"}
              onChange={handleChange}
              className="mr-1"
            />
            Organization
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full mt-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}
