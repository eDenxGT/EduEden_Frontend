import { axiosInstance } from "../axiosConfig";

export const getAllOrders = async (params) => {
  try {
    const response = await axiosInstance.get(`/admin/get-all-orders`, {params});
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders :`, error);
    return null;
  }
};

export const getAllTutors = async (apiFor) => {
  try {
    const response = await axiosInstance.get(`/admin/get-tutors?apiFor=${apiFor}`);
    return response.data.tutors;
  } catch (error) {
    console.error(`Error fetching tutors for ${apiFor}:`, error);
    return null;
  }
};

export const getAllCourses = async (apiFor) => {
  try {
    const response = await axiosInstance.get(`/courses/get-all?apiFor=${apiFor}`);
    return response.data.courses;
  } catch (error) {
    console.error(`Error fetching courses for ${apiFor}:`, error);
    return null;
  }
};