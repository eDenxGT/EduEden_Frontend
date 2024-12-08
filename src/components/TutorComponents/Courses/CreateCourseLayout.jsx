import { useEffect, useState } from "react";
import Card from "../../CommonComponents/Card";
import AdvanceInformationPage from "./CreateCourse/AdvancedInformationPage";
import LectureAddingPage from "./CreateCourse/LectureAddingPage";
import PublishCoursePage from "./CreateCourse/PublishCoursePage";
import BasicInformationPage from "./CreateCourse/BasicInformationPage";
import { Layers, NotepadText, TvMinimalPlay, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { resetFormData } from "../../../store/slices/newCourse";

const CreateCourseLayout = () => {
	const [page, setPage] = useState(1);



	const isDarkMode = useSelector((state) => state.tutor.toggleTheme);
	const { ...formData } = useSelector((state) => state.newCourse);
	const dispatch = useDispatch()

	useEffect(()=>{
		console.log(formData);
		
	},[formData])

	useEffect(() => {
		if (
			formData.title &&
			formData.course_description &&
			formData.category &&
			formData.course_description &&
			formData.duration &&
			formData.language &&
			formData.level &&
			formData.price &&
			formData.course_thumbnail &&
			formData.lectures.length > 0
		)
			setPage(4);
		if (
			formData.title === "" &&
			formData.category === "" &&
			formData.level === "" &&
			formData.duration === "" &&
			formData.language === "" && 
			formData.course_description === "" &&
			formData.course_thumbnail === "" &&
			formData.lectures.length === 0 &&
			formData.price === ""
		) {
			dispatch(resetFormData());
			setPage(1);
		}

	}, []);

	const navItems = [
		{ label: "Basic Information", icon: <Layers size={16} /> },
		{ label: "Advance Information", icon: <NotepadText size={16} /> },
		{ label: "Add Lectures", icon: <TvMinimalPlay size={16} /> },
		{ label: "Publish Course", icon: <Upload size={16} /> },
	];

	return (
		<div
			className={`min-h-screen p-6 ${
				isDarkMode
					? "bg-gray-900 text-gray-100"
					: "bg-gray-200 text-gray-900"
			}`}>
			<div className="max-w-4xl mx-auto">
				<Card
					className={`p-6 overflow-visible ${
						isDarkMode ? "bg-gray-800" : "bg-white"
					}`}>
					{/* Header Section */}
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-semibold">
							Create a new course
						</h2>
					</div>

					{/* Navigation Section */}
					<nav className="flex justify-evenly mb-4 border-b border-gray-600 pb-4">
						{navItems.map((item, index) => (
							<a
								key={item.label}
								href="#"
								className={`flex items-center space-x-2 ${
									page === index + 1
										? "text-orange-500 border-b-2 border-orange-500 pb-1"
										: isDarkMode
										? "text-gray-400 hover:text-gray-300"
										: "text-gray-500 hover:text-gray-700"
								} transition-colors duration-200`}
								onClick={() => setPage(index + 1)}>
								<span>{item.icon}</span>
								<span>{item.label}</span>
							</a>
						))}
					</nav>

					{/* Page Rendering */}
					{page === 1 && (
						<BasicInformationPage
							goToNextPage={() => setPage(2)}
							isDarkMode={isDarkMode}
						/>
					)}
					{page === 2 && (
						<AdvanceInformationPage
							goToNextPage={() => setPage(3)}
							isDarkMode={isDarkMode}
							goToPreviousPage={() => setPage(1)}
						/>
					)}
					{page === 3 && (
						<LectureAddingPage
							goToNextPage={() => setPage(4)}
							isDarkMode={isDarkMode}
							goToPreviousPage={() => setPage(2)}
						/>
					)}
					{page === 4 && (
						<PublishCoursePage
							goToNextPage={() => console.log("Form Submitted")}
							isDarkMode={isDarkMode}
							goToPreviousPage={() => setPage(3)}
						/>
					)}
				</Card>
			</div>
		</div>
	);
};

export default CreateCourseLayout;
