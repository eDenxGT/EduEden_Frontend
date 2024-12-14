import { axiosInstance } from "../axiosConfig";

export const getAllTutorsForStudents = async (apiFor) => {
  try {
    const response = await axiosInstance.get(
      `/student/get-tutors?apiFor=${apiFor}`
    );
    return response.data.tutors;
  } catch (error) {
    console.error(`Error fetching tutors for ${apiFor}:`, error);
    return null;
  }
};

export const getStudentPurchases = async (params) => {
  try {
    const response = await axiosInstance.get(`/student/get-purchases`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching purchases for student :`, error);
    return null;
  }
};
