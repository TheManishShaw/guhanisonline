import axios from "axios";
import { signIn, getSession } from "next-auth/react";
import Router from "next/router";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set your API base URL here
});

// Add a request interceptor to include the access token in headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session && session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Router.push("/sign-in"); // Redirect to sign-in page if unauthorized
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
