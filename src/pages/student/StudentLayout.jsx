import { Outlet } from "react-router-dom";
import Header from "../../components/MainComponents/Header";
import Footer from "../../components/MainComponents/Footer";

const StudentLayout = () => {
	return (
		<>
			<Header role="student" />
			<Outlet />
			<Footer />
		</>
	);
};

export default StudentLayout;
