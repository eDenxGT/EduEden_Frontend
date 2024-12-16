import { Outlet } from "react-router-dom";
import Header from "../../components/MainComponents/Header";
import Footer from "../../components/MainComponents/Footer";
import { CallPopup } from "@/utils/VideoChat/CallPopup";
import VideoCall from "@/utils/VideoChat/PopupVideoCalll";
import Chatbot from "@/utils/ChatBot";

const StudentLayout = () => {
	const role = "student";
	return (
		<>
			<Header role={role} />
			<Outlet />
			<Footer />
			<Chatbot role={role} />
			<CallPopup />
			<VideoCall />
		</>
	);
};

export default StudentLayout;
