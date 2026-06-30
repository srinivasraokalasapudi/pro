import { axiosWrapper } from "./axiosWrapper";

export const getDashboardStats = async () => {
  const { data } = await axiosWrapper.get("/api/dashboard");
  return data.data;
};