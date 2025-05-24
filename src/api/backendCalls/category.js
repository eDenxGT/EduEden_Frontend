import { axiosInstance } from "../axiosConfig";

export const getAllCategories = async (apiFor) => {
    try {
        const response = await axiosInstance.get(`/categories/get-all?apiFor=${apiFor}`);
        return response.data.categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};