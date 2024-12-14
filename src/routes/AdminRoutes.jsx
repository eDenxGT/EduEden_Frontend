import { Route, Routes } from "react-router-dom";
import AdminSignIn from "../pages/admin/AuthPages/AdminSignIn";
import AdminDashboard from "../components/AdminComponents/AdminDashboard";
import TutorManagement from "../components/AdminComponents/SideBar/TutorMangement";
import StudentManagement from "../components/AdminComponents/SideBar/StudentManagement";
// import AdminSettings from "../components/AdminComponents/SideBar/AdminSettings"
import AdminLayout from "../pages/admin/AdminLayout";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import PrivateRoute from "../utils/ProtectRoutes/PrivateRoute";
import Categories from "../components/AdminComponents/Categories/Categories";
import AddCategoriesModal from "../components/AdminComponents/Categories/AddCategoriesModal";
import Orders from "../components/AdminComponents/SideBar/Orders/OrdersList";
import CourseListing from "../components/AdminComponents/Courses/CourseListing";
import SingleCourseDetails from "../components/AdminComponents/Courses/SingleCourseDetails";
import TutorApplications from "@/components/AdminComponents/SideBar/TutorApplcations";
import NotFoundPage from "@/pages/Others/NotFoundPage";

const AdminRoutes = () => {
	return (
		<>
			<Routes>
				<Route
					path="signin"
					element={
						<PublicRoute redirectToAdmin="/admin/dashboard">
							<AdminSignIn />
						</PublicRoute>
					}
				/>

				<Route path="/"element={<PrivateRoute allowedRole="admin" redirectTo="/admin/signin"><AdminLayout /></PrivateRoute>}>
					<Route path="dashboard" element={<AdminDashboard />} />
					<Route path="tutors" element={<TutorManagement />} />
					<Route path="students" element={<StudentManagement />} />
					<Route path="categories" element={<Categories />} />
					<Route path="tutors/applications" element={<TutorApplications />} />
					<Route
						path="categories/new"
						element={<AddCategoriesModal />}
					/>
					<Route path="orders" element={<Orders />} />
					<Route path="courses" element={<CourseListing />} />

					<Route
						path="courses/:course_id"
						element={<SingleCourseDetails />}
					/>
					{/* <Route path="settings" element={<AdminSettings />} /> */}
				</Route>

				<Route path="/*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
};

export default AdminRoutes;
