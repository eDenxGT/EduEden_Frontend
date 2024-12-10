import Header from "../../components/MainComponents/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/MainComponents/TutorFooter";
import { Toaster } from "@/components/ui/toaster";

const TutorLayout = () => {
  const role = "tutor";
  return (
    <>
      <Header role={role} />
      <Outlet />
      <Footer role={role} />
	  <Toaster />
    </>
  );
};

export default TutorLayout;
