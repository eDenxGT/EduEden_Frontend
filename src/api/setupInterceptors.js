import Cookies from "js-cookie";
import { axiosInstance } from "./axiosConfig";
import { toast } from "sonner";

const attachRequestInterceptor = (axiosCustomInstance) => {
  axiosCustomInstance.interceptors.request.use(
    (config) => {
      if (config.url.includes("cloudinary.com")) {
        config.withCredentials = false;
        return config;
      }
      const adminAccessToken = Cookies.get("admin_access_token");
      const tutorAccessToken = Cookies.get("tutor_access_token");
      const studentAccessToken = Cookies.get("student_access_token");

      const token =
        adminAccessToken || tutorAccessToken || studentAccessToken || null;
      console.log("TOKEN", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

const attachResponseInterceptor = (axiosCustomInstance, refreshEndpoint) => {
  axiosCustomInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.error("Interceptor Error:", error);

      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "Token is invalid or expired." &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const response = await axiosInstance.post(
            refreshEndpoint,
            {},
            { withCredentials: true }
          );

          const { role, access_token } = response.data;

          Cookies.set(`${role}_access_token`, access_token, { expires: 7 });
          console.log(`${role}_access_token stored successfully.`);

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axiosCustomInstance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh Token Error:", refreshError);

          Cookies.remove("admin_access_token");
          Cookies.remove("student_access_token");
          Cookies.remove("tutor_access_token");

          toast.info("Your session has expired. Please sign in again.");

          const role = error.response?.data?.role || "student";
          switch (role) {
            case "student":
              window.location.href = "/student/signin";
              break;
            case "tutor":
              window.location.href = "/tutor/signin";
              break;
            case "admin":
              window.location.href = "/admin/signin";
              break;
            default:
              window.location.href = "/";
          }

          return Promise.reject(refreshError);
        }
      }
      if (
        error.response?.status === 403 &&
        error.response?.data?.message === "No token provided."
      ) {
        console.log("NO TOKEN");
        toast.info("Your session has expired. Please sign in again.");
        window.location.href = "/";
        return Promise.reject(error);
      }
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "Invalid token format."
      ) {
        toast.info("Your session has expired. Please sign in again.");
        window.location.href = "/";
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};

export { attachRequestInterceptor, attachResponseInterceptor };
