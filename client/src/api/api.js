import axios from "axios";

const API = axios.create({
  baseURL: "https://onlinelms-g4lz.onrender.com", // ✅ your deployed backend
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
