import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import StudentRoutes from "./routes/StudentRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { Toaster as Toaster2 } from "sonner";
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";
import PublicRoutes from "./routes/PublicRoutes";
import Error404Page from "./pages/Others/Error404Page";
import PublicRoute from "./utils/ProtectRoutes/PublicRoute";
import LoadingUi from "./utils/Modals/LoadingUi";
import SpinnerLoadingModal from "./utils/Modals/SpinnerLoadingModal";
import ContactPage from "./pages/Others/ContactUs";
import AboutPage from "./pages/Others/AboutUs";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <Router>
    <ScrollToTop />
      <Toaster2 position="top-right" richColors />
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

        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
      <LoadingUi />
      <SpinnerLoadingModal />
      <ShadToaster />
      <HotToaster />
    </Router>
  );
}

export default App;
