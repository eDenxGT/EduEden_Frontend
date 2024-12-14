import { axiosInstance } from "../axiosConfig";

export const getTutorDetails = async (apiFor) => {
  try {
    const response = await axiosInstance.get(`/tutor/get-details?apiFor=${apiFor}`);
    return response.data.details;
  } catch (error) {
    console.error("Error fetching tutor details:", error);
    throw error;
  }
};

export const getTutorEarnings = async () => {
  try {
    const response = await axiosInstance.get(`/tutor/get-earnings`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching tutor earnings:", error);
    throw error;
  }
};

export const getTutorWithdrawals = async () => {
  try {
    const response = await axiosInstance.get(`/tutor/get-withdrawals`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tutor withdrawals:", error);
    throw error;
  }
};

export const withdrawTutorEarnings = async (amount) => {
  try {
    const response = await axiosInstance.post(`/tutor/withdraw`, { amount });
    return response.data;
  } catch (error) {
    console.error("Error withdrawing tutor earnings:", error);
    throw error;
  }
};

export const addCard = async (card) => {
  try {
    const response = await axiosInstance.post(`/tutor/add-card`, { card });
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};