import axiosInstance from "./axiosInstance";

export const getRequest = async (url) => {
  const { data } = await axiosInstance.get(url);
  return data;
};

export const postRequest = async (url, body) => {
  const { data } = await axiosInstance.post(url, body);
  return data;
};
