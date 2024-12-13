import { axiosInstance } from "../axiosConfig";

export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get("/admin/get-all-orders");
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

