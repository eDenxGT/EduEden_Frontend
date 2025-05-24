/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import {jwtDecode as jwt_decode} from "jwt-decode";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const getRoleFromToken = (token) => {
    if (!token) return null;
    try {
      const decoded = jwt_decode(token);
      console.log(decoded)
      return decoded?.role;
    } catch (error) {
      console.log("Role getting from token error:", error);
      return null;
    }
  };

  const studentToken = Cookies.get("student_access_token");
  const tutorToken = Cookies.get("tutor_access_token");
  const adminToken = Cookies.get("admin_access_token");

  const studentRole = getRoleFromToken(studentToken);
  const tutorRole = getRoleFromToken(tutorToken);
  const adminRole = getRoleFromToken(adminToken);

  console.log(studentRole, tutorRole, adminRole);

  if (studentRole === "student") {
    return <Navigate to="/student/home" replace />;
  }

  if (tutorRole === "tutor") {
    return <Navigate to="/tutor/dashboard" replace />;
  }

  if (adminRole === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
