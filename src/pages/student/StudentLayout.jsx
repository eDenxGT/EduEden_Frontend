import { Outlet } from "react-router-dom";
import Header from "../../components/MainComponents/Header";
import Footer from "../../components/MainComponents/Footer";
import { CallPopup } from "@/utils/VideoChat/CallPopup";
import VideoCall from "@/utils/VideoChat/PopupVideoCalll";

const StudentLayout = () => {
	return (
		<>
			<Header role="student" />
			<Outlet />
			<Footer />
			<CallPopup />
			<VideoCall />
		</>
	);
};

export default StudentLayout;
