import { axiosInstance } from "../axiosConfig";

export const getAllOrders = async (params) => {
  try {
    const response = await axiosInstance.get(`/admin/get-all-orders`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders :`, error);
    return null;
  }
};

export const getAllTutors = async (apiFor) => {
  try {
    const response = await axiosInstance.get(
      `/admin/get-tutors?apiFor=${apiFor}`
    );
    return response.data.tutors;
  } catch (error) {
    console.error(`Error fetching tutors for ${apiFor}:`, error);
    return null;
  }
};

export const getWithdrawalRequests = async (params) => {
  try {
    const response = await axiosInstance.get(`/admin/get-withdrawal-requests`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching withdrawal requests:`, error);
    return null;
  }
};

export const updateWithdrawalStatus = async (request_id, newStatus) => {
  try {
    const response = await axiosInstance.put(
      `/admin/update-withdrawal-status`,
      { request_id, newStatus }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating withdrawal status:`, error);
    return null;
  }
};

export const getDataForAdminDashboard = async () => {
  try {
    const response = await axiosInstance.get(`/admin/get-admin-dashboard-data`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data for admin dashboard:`, error);
    return null;
  }
};  