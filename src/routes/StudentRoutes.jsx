import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/student/AuthPages/SignUp";
import SignIn from "../pages/student/AuthPages/SignIn";
import StudentHomePage from "../components/StudentComponents/StudentHomePage";
import StudentLayout from "../pages/student/StudentLayout";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import PrivateRoute from "../utils/ProtectRoutes/PrivateRoute";
import ProfileManagement from "../components/StudentComponents/Settings/ProfileManagement";
import Settings from "../components/StudentComponents/Settings/Settings";
import AllCourseListingPage from "../components/StudentComponents/Courses/AllCourseListingPage";
import SingleCourseDetails from "../components/StudentComponents/Courses/SingleCourseDetails";
import CoursePlayer from "../components/StudentComponents/Courses/CoursePlayer";
import CourseCart from "../components/StudentComponents/CourseCart";
import CheckoutPage from "../components/StudentComponents/Payment/CheckoutPage";
import OrderSummary from "../components/StudentComponents/Payment/OrderSummary";
import PurchasedCourse from "../components/StudentComponents/Courses/PurchasedCourse";
import MyCourses from "../components/StudentComponents/Courses/MyCoursesList";
import Quiz from "../components/StudentComponents/Courses/Quizzes/Quiz";
import QuizResult from "../components/StudentComponents/Courses/Quizzes/QuizResult";
import Certificate from "../components/StudentComponents/Courses/Certificates/Certificate";
import { Chat } from "@/utils/Chat/Chat";
import VideoCall from "@/utils/VideoChat/PopupVideoCalll";
import PurchaseHistory from "@/components/StudentComponents/Settings/PurchaseHistory/PurchaseHistory";
import NotFoundPage from "@/pages/Others/NotFoundPage";
import AllTutorListing from "@/components/StudentComponents/Settings/AllTutorsListing";

const StudentRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route path="video-popup" element={<VideoCall role="student" />} />
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo={"/student/signin"} allowedRole="student">
              <StudentLayout />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<StudentHomePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/profile" element={<ProfileManagement />} />

          <Route path="cart/:student_id" element={<CourseCart />} />

          <Route path="courses" element={<AllCourseListingPage />} />
          <Route path="courses/:course_id" element={<SingleCourseDetails />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="my-courses/:course_id" element={<PurchasedCourse />} />
          <Route
            path="my-courses/:course_id/lecture/:lecture_id"
            element={<CoursePlayer />}
          />
          <Route
            path="my-courses/:course_id/quiz/:quiz_id"
            element={<Quiz />}
          />
          <Route
            path="my-courses/:course_id/quiz/:quiz_id/result"
            element={<QuizResult />}
          />

          <Route path="chat" element={<Chat role="student" />} />

          <Route path="purchases" element={<PurchaseHistory />} />
          <Route path="tutors" element={<AllTutorListing  />} />

          <Route path="checkout/:student_id" element={<CheckoutPage />} />
          <Route path="order/:order_id" element={<OrderSummary />} />

        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default StudentRoutes;
