import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

// const http = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
// });

const base = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";
const http = axios.create({ baseURL: base, headers: { "Content-Type": "application/json" }});

// Inject token into headers
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global errors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg =
      error.response?.data?.message || "Something went wrong!";
    return Promise.reject(new Error(msg));
  }
);

export default http;
