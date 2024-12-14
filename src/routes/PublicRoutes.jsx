import { Route, Routes } from "react-router-dom";
import PublicLayout from "../pages/PublicPage/PublicLayout";
import LandingPage from "../components/PubicPages/LandingPage";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import ContactPage from "@/pages/Others/ContactUs";
import NotFoundPage from "@/pages/Others/NotFoundPage";
import AboutPage from "@/pages/Others/AboutUs";

const PublicRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute>
						<PublicLayout />
					</PublicRoute>
				}>
				<Route path="" element={<LandingPage />} />
			</Route>
			<Route path="/*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default PublicRoutes;
