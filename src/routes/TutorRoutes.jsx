import { Route, Routes } from "react-router-dom";
import TutorSignIn from "../pages/tutor/AuthPages/TutorSignIn";
import TutorSignup from "../pages/tutor/AuthPages/TutorSignUp";
import TutorDashboard from "../components/TutorComponents/Dashboard/TutorDashboard";
import TutorLayout from "../pages/tutor/TutorLayout";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import PrivateRoute from "../utils/ProtectRoutes/PrivateRoute";
import Error404Page from "../pages/Others/Error404Page";
import Settings from "../components/TutorComponents/Settings/Settings";
import ProfileManagement from "../components/TutorComponents/Settings/ProfileManagement";
import MyCourses from "../components/TutorComponents/Courses/MyCourses";
import CreateCourseLayout from "../components/TutorComponents/Courses/CreateCourseLayout";
import CourseDetails from "../components/TutorComponents/Courses/CourseDetails";
import EditCourseLayout from "../components/TutorComponents/Courses/EditCourseLayout";
import CoursePlayer from "../components/TutorComponents/Courses/CoursePlayer";
import { Chat } from "@/utils/Chat/Chat";

const TutorRoutes = () => {
	return (
		<>
			<Routes>
				<Route
					path="signup"
					element={
						<PublicRoute>
							<TutorSignup />
						</PublicRoute>
					}
				/>
				<Route
					path="signin"
					element={
						<PublicRoute>
							<TutorSignIn />
						</PublicRoute>
					}
				/>
				<Route
					path="/"
					element={
						<PrivateRoute
							allowedRole="tutor"
							redirectTo={"/tutor/signin"}>
							<TutorLayout />
						</PrivateRoute>
					}>
					<Route path="dashboard" element={<TutorDashboard />} />

					{/* TEST ROUTES */}
					<Route path="settings" element={<Settings />} />
					<Route path="settings/profile" element={<ProfileManagement />} />
					<Route path="my-courses" element={<MyCourses />} />
					<Route path="my-courses/:course_id" element={<CourseDetails />} />
					<Route path="my-courses/:course_id/lectures/:lecture_id" element={<CoursePlayer />} />
					<Route path="my-courses/edit/:course_id" element={<EditCourseLayout />} />
					{/* <Route path="my-courses/dummy" element={<DummyDetails />} /> */}

					<Route path="courses/new" element={<CreateCourseLayout />} />

					<Route path="chat" element={<Chat role="tutor" />} />


				</Route>
				<Route path="/*" element={<Error404Page />} />
			</Routes>
		</>
	);
};

export default TutorRoutes;
