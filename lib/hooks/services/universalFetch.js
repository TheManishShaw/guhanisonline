import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { toast } from "sonner";

export const getAllBlogList = async () => {
  try {
    const res = await axiosInstance.get(`/blog/list`).then((res) => res);
    return res.data;
  } catch (error) {
    toast.error(`Something Went Wrong! ${error}`);
  }
};
export const getAllClienteleList = async () => {
  try {
    const res = await axiosInstance
      .post(`/openapi/clientele/list`)
      .then((res) => res);
    return res.data;
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
    const res = await axiosInstance
      .get(`/users/all_users`)
      .then((res) => res.data);
    return res;
  } catch (error) {
    toast.error(`Something Went Wrong! ${error}`);
  }
};

export const getSelfDetails = async () => {
  try {
    const res = await axiosInstance.get(`/users/me`).then((res) => res.data);
    return res;
  } catch (error) {
    toast.error(`Something Went Wrong! ${error}`);
  }
};

export const getBeatsList = async () => {
  try {
    const res = await axiosInstance
      .post(`/collections/list`)
      .then((res) => res.data);
    return res;
  } catch (error) {
    toast.error(`Something Went Wrong! ${error}`);
  }
};

// All post request the listed below

export const login = (credentials) => {
  try {
    const result = axiosInstance
      .post(`/auth/login`, {
        ...credentials,
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
// export const signOut = async () => {
//   try {
//     await axiosInstance.post("/auth/logout");
//   } catch (error) {
//     console.error("Failed to sign out:", error);
//   }
// };
export const contactForm = (formData) => {
  try {
    const result = axiosInstance
      .post(`/openapi/contact`, {
        ...formData,
      })
      .then((res) => res);

    return result;
  } catch (error) {
    console.log("error=====>", error);
  }
};
export const updateSelfDetails = (userId, formData) => {
  try {
    const result = axiosInstance
      .put(`/users/update/${userId}`, {
        ...formData,
      })
      .then((res) => res);

    return result;
  } catch (error) {
    console.log("error=====>", error);
  }
};

export const addBlog = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const result = await axiosInstance.post(`/blog/add`, formData, config);
    return result; // Assuming you want the data from the response
  } catch (error) {
    console.log("error=====>", error);
    throw error; // It's better to rethrow the error so it can be handled by the caller
  }
};
export const addClientele = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const result = await axiosInstance.post(
      `/openapi/clientele/store`,
      formData,
      config
    );
    return result; // Assuming you want the data from the response
  } catch (error) {
    console.log("error=====>", error);
    throw error; // It's better to rethrow the error so it can be handled by the caller
  }
};

export const addBeats = (formData) => {
  try {
    const result = axiosInstance
      .post(`/collections/add`, {
        ...formData,
      })
      .then((res) => res);

    return result;
  } catch (error) {
    console.log("error=====>", error);
  }
};
export const getOpenBlogsList = () => {
  try {
    const response = axiosInstance.get(`/openapi/blog/list`).then((res) => res);
    return response;
  } catch (error) {
    console.log("error=====>", error);
  }
};

export const getOpenBeatsList = () => {
  try {
    const response = axiosInstance
      .get(`/openapi/products/collections`)
      .then((res) => res.data);
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("error=====>", error);
  }
};

export const getOpenBlogsDetailById = (blog_id) => {
  console.log("inside blog it", blog_id);
  try {
    const response = axiosInstance
      .get(`/openapi/blog/details/${blog_id}`)
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.log("error=====>", error);
  }
};

// All Delete request

export const deleteBlogById = (blog_id) => {
  console.log("inside blog it", blog_id);
  try {
    const response = axiosInstance
      .delete(`/blog/delete/${blog_id}`)
      .then((res) => res);
    return response;
  } catch (error) {
    console.log("error=====>", error);
  }
};
