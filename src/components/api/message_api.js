import axiosInstance from "./axiosInstance";

export const sendChatMessage = async ({ data }) => {
  try {
    const res = await axiosInstance.post(`msg/send`,
      data,
    );
    return res;
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};