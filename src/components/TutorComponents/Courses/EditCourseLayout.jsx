import { useEffect, useState } from "react";
import Card from "../../CommonComponents/Card";
import AdvanceInformationPage from "./EditCourse/AdvancedInformationPage";
import LectureAddingPage from "./EditCourse/LectureAddingPage";
import PublishCoursePage from "./EditCourse/PublishCoursePage";
import BasicInformationPage from "./EditCourse/BasicInformationPage";
import { Layers, NotepadText, TvMinimalPlay, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
	resetFormData,
	setInitialData,
	updateFormData,
} from "../../../store/slices/updateCourse";
import { useParams } from "react-router-dom";
import { fetchCoursesByCourseId } from "../../../store/thunks/courseThunks";

const EditCourseLayout = () => {
	const [page, setPage] = useState(1);

	const isDarkMode = useSelector((state) => state.tutor.toggleTheme);
	const { course_id } = useParams();
	const dispatch = useDispatch();
	const isAlreadyEditing = useSelector(
		(state) => state.updateCourse.course_id === course_id
	);

	useEffect(() => {
		if (isAlreadyEditing) {
			return;
		}
		const fetchCourseDetails = async () => {
			try {
				const course = await dispatch(
					fetchCoursesByCourseId({course_id, role:"tutor" })
				).unwrap();

				dispatch(setInitialData(course));
			} catch (error) {
				console.error("Failed to fetch course details:", error);
			}
		};
		fetchCourseDetails();
	}, [course_id, dispatch]);

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
						<h2 className="text-lg font-semibold">Edit Course</h2>
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

export default EditCourseLayout;
