import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { axiosInstance } from "../api/axiosConfig";

const SOCKET_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const getAuthDetails = () => {
  const tutorToken = Cookies.get("tutor_access_token");
  const studentToken = Cookies.get("student_access_token");

  if (tutorToken) {
    return { role: "tutor", token: tutorToken };
  } else if (studentToken) {
    return { role: "student", token: studentToken };
  }
  return { role: null, token: null };
};

let { role, token } = getAuthDetails();

let isRefreshing = false;

const socket = io(SOCKET_URL, {
  auth: {
    token: token || null,
    role,
  },
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("Socket connected successfully");
  isRefreshing = false;
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error.message);
  if (error.message === "Invalid token. Please login again.") {
    Cookies.remove("tutor_access_token");
    Cookies.remove("tutorRefreshToken");
    Cookies.remove("studentRefreshToken");
    Cookies.remove("student_access_token");
    window.location.href =
      role === "tutor" ? "/tutor/signin" : "/student/signin";
  }
});

socket.on("token-expired", async () => {
  if (isRefreshing) {
    console.log("Refresh already in progress. Skipping additional attempts.");
    return;
  }

  isRefreshing = true; 
  console.log("Token expired, attempting to refresh...");

  try {
    const refreshResponse = await axiosInstance.post(
      "/auth/refresh-token",
      {},
      { withCredentials: true }
    );

    const { access_token, role: refreshedRole } = refreshResponse.data;

    Cookies.set(`${refreshedRole}_access_token`, access_token, {
      expires: 13 / (24 * 60),
    });

    socket.auth.token = access_token;
    socket.auth.role = refreshedRole;

    socket.connect();
    console.log("Token refreshed and socket reconnected successfully.");
  } catch (error) {
    console.error("Failed to refresh token (in Socket): ", error);

    Cookies.remove("tutor_access_token");
    Cookies.remove("student_access_token");

    window.location.href =
      role === "tutor" ? "/tutor/signin" : "/student/signin";
  } finally {
    isRefreshing = false;
  }
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

export default socket;
