import Header from "../../components/MainComponents/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/MainComponents/TutorFooter";

const TutorLayout = () => {
   const role = "tutor";
	return (
		<>
			<Header role={role} />
			<Outlet />
         <Footer role={role}/>
		</>
	);
};

export default TutorLayout;
