// client/src/lib/api/axios.ts
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const instance = axios.create({
  baseURL: API,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach auth token if present in localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

// Response interceptor: unwrap data or forward errors
instance.interceptors.response.use((res) => res, (err) => {
  // Normalize error shape
  const response = err.response;
  if (response && response.data) {
    err.normalized = {
      status: response.status,
      data: response.data,
      message: response.data.message || response.statusText,
    };
  } else {
    err.normalized = { status: 0, message: err.message || "Network error" };
  }
  return Promise.reject(err);
});

export default instance;
