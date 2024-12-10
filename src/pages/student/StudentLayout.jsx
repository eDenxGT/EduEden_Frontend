import { Outlet } from "react-router-dom";
import Header from "../../components/MainComponents/Header";
import Footer from "../../components/MainComponents/Footer";
import { Toaster } from "@/components/ui/toaster";

const StudentLayout = () => {
	return (
		<>
			<Header role="student" />
			<Outlet />
			<Footer />
			<Toaster />
		</>
	);
};

export default StudentLayout;
