import axios from "axios";
const BASE_URL=process.env.REACT_APP_BASE_URL || "http://localhost:5000";
const API = axios.create({
  baseURL: BASE_URL, // backend URL
});

// Add token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
