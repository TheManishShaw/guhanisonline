// lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Add your base URL here
  //   timeout: 10000, // Set a timeout limit for requests
  "Content-Type": "application/json",
});

// Optional: Add interceptors for request and response
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token or other headers here
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
