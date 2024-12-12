import Header from "../../components/MainComponents/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/MainComponents/TutorFooter";
import { CallPopup } from "@/utils/VideoChat/CallPopup";
import VideoCall from "@/utils/VideoChat/PopupVideoCalll";

const TutorLayout = () => {
  const role = "tutor";
  return (
    <>
      <Header role={role} />
      <Outlet />
      <Footer role={role} />
      <CallPopup role="student" />
      <VideoCall />
    </>
  );
};

export default TutorLayout;
