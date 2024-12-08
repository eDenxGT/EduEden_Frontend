import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import StudentRoutes from "./routes/StudentRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { Toaster } from "sonner";
import PublicRoutes from "./routes/PublicRoutes";
import Error404Page from "./pages/Others/Error404Page";
import PublicRoute from "./utils/ProtectRoutes/PublicRoute";
import LoadingUi from "./utils/Modals/LoadingUi";
import SpinnerLoadingModal from "./utils/Modals/SpinnerLoadingModal";

function App() {
	return (
		<Router>
			<Toaster position="top-right" richColors />
			<Routes>
				<Route path="/" element={<PublicRoutes />} />
				<Route path="/student/*" element={<StudentRoutes />} />
				<Route path="/tutor/*" element={<TutorRoutes />} />
				<Route path="/admin/*" element={<AdminRoutes />} />
				<Route
					path="/forgot-password"
					element={
						<PublicRoute>
							<ForgotPassword />
						</PublicRoute>
					}
				/>
				<Route
					path="/reset-password/:token"
					element={
						<PublicRoute>
							<ResetPassword />
						</PublicRoute>
					}
				/>

				{/* <Route path="/loading" element={<LoadingUi />} /> */}
				<Route path="/*" element={<Error404Page />} />
			</Routes>
			<LoadingUi />
			<SpinnerLoadingModal />
		</Router>
	);
}

export default App;
