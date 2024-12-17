import Header from "../../components/MainComponents/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/MainComponents/TutorFooter";
import { CallPopup } from "@/utils/VideoChat/CallPopup";
import VideoCall from "@/utils/VideoChat/PopupVideoCalll";
// import Chatbot from "@/utils/EthenAI";

const TutorLayout = () => {
  const role = "tutor";
  return (
    <>
      <Header role={role} />
      <Outlet />
      <Footer role={role} />
      {/* <Chatbot role={role} /> */}
      <CallPopup />
      <VideoCall />
    </>
  );
};

export default TutorLayout;
