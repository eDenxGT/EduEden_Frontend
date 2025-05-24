/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRole, redirectTo, children }) => {
	const accessToken = Cookies.get(`${allowedRole}_access_token`);
	console.log(accessToken);
	const getRoleFromToken = (token) => {
		if (!token) return null;
		try {
			const decoded = jwt_decode(token);
			console.log(decoded);
			return decoded?.role;
		} catch (error) {
			console.log("Role getting from token error:", error);
			return null;
		}
	};

	const userRole = getRoleFromToken(accessToken);

	const isAuthorized = (allowedRole === userRole);

	if (!isAuthorized) {
		return <Navigate to={redirectTo} replace />;
	}

	return children;
};

export default PrivateRoute;
