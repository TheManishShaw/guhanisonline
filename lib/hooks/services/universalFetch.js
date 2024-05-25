import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export const getAllBlogList = async () => {
  try {
    const res = await axiosInstance.get(`/blog/list`).then((res) => res);
    return res;
  } catch (error) {
    toast.error(`Something Went Wrong! ${error}`);
  }
};

export const getBlogDetailsById = async (blogId) => {
  try {
    const res = await axiosInstance
      .get(`/users/details/${blogId}`)
      .then((res) => res);
    return res;
  } catch (error) {
    toast.error(`Something Went Wrong! ${error}`);
  }
};

export const getAllOrderList = async () => {
  try {
    const res = await axiosInstance.get(`/orders/list`).then((res) => res);
    return res;
  } catch (error) {
    toast.error(`Something Went Wrong! ${error}`);
  }
};

export const getAllUsersList = async () => {
  try {
    const res = await axiosInstance.get(`/users/list`).then((res) => res);
    return res;
  } catch (error) {
    toast.error(`Something Went Wrong! ${error}`);
  }
};

// All post request the listed below

export const signIn = (formData) => {
  try {
    const result = axiosInstance
      .post(`/login`, {
        ...formData,
      })
      .then((res) => res);

    return result;
  } catch (error) {
    console.log("error=====>", error);
  }
};

export const signUp = (formData) => {
  try {
    const result = axiosInstance
      .post(`/auth/register`, {
        ...formData,
      })
      .then((res) => res);

    return result;
  } catch (error) {
    console.log("error=====>", error);
  }
};

export const contactForm = (formData) => {
  try {
    const result = axiosInstance
      .post(`/contact`, {
        ...formData,
      })
      .then((res) => res);

    return result;
  } catch (error) {
    console.log("error=====>", error);
  }
};
