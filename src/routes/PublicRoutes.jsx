import { Route, Routes } from "react-router-dom";
import PublicLayout from "../pages/PublicPage/PublicLayout";
import LandingPage from "../components/PubicPages/LandingPage";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import Error404Page from "../pages/Others/Error404Page";

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
				{/* <Route path="contact" element={<ContactPage />} /> */}
			</Route>

			<Route path="/*" element={<Error404Page />} />
		</Routes>
	);
};

export default PublicRoutes;
