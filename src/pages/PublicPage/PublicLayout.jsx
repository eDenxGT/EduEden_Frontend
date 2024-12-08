import Header from "../../components/MainComponents/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/MainComponents/Footer";

const PublicLayout = () => {
	return (
		<>
			<Header role="public" />
			<Outlet />
			<Footer />
		</>
	);
};

export default PublicLayout;
