import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import CourseCard from "../../CommonComponents/CourseCard";
import SelectInputField from "../../CommonComponents/SelectInputField";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteCourseById,
	fetchCoursesByTutorId,
} from "../../../store/thunks/courseThunks";
import ConfirmationModal from "../../../utils/Modals/ConfirmtionModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
	const isDarkMode = useSelector((state) => state.tutor.toggleTheme);

	const { courses } = useSelector((state) => state.courses);
	const { user_id } = useSelector((state) => state?.tutor?.tutorData);
	const dispatch = useDispatch();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedCourseId, setSelectedCourseId] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(8);
	const [sortBy, setSortBy] = useState("Default");
	const [category, setCategory] = useState("All Category");
	const [rating, setRating] = useState("All Ratings");
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const sortOptions = [
		"Price: Default",
		"Price: Low to High",
		"Price: High to Low",
		"Rating: High to Low",
	];
	const categoryOptions = [
		"All Category",
		"DEVELOPMENT",
		"BEGINNERS",
		"BEGINNING",
	];
	const ratingOptions = [
		"All Ratings",
		"4 Star & Up",
		"3 Star & Up",
		"2 Star & Up",
		"1 Star & Up",
	];

	const onClose = () => {
		setIsDeleteModalOpen(false);
		setSelectedCourseId(null);
	};

	const onConfirm = async () => {
		try {
			await dispatch(deleteCourseById(selectedCourseId)).unwrap();
			onClose();
			navigate("/tutor/my-courses");
			toast.success("Course deleted successfully!");
		} catch (error) {
			console.log("Delete Course By Id error : ", error);
			toast.error("Deleting course failed!");
		}
	};

	useEffect(() => {
		dispatch(fetchCoursesByTutorId(user_id)).unwrap();
	}, [dispatch]);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentCourses = Array.isArray(courses)
		? courses.slice(indexOfFirstItem, indexOfLastItem)
		: [];

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div
			className={`min-h-screen ${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-100 text-gray-900"
			}`}>
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-2xl font-semibold">My Courses</h1>
				</div>

				<div className="flex flex-col space-y-4 mb-8">
					<div className="relative w-full">
						<input
							type="text"
							placeholder="Search in your courses..."
							className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
								isDarkMode
									? "bg-gray-800 border-gray-700 text-white"
									: "bg-white border-gray-200 text-gray-900"
							} focus:outline-none focus:ring-2 focus:ring-orange-500`}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Search
							className={`absolute left-3 top-2.5 w-5 h-5 ${
								isDarkMode ? "text-gray-400" : "text-gray-500"
							}`}
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<SelectInputField
							options={sortOptions}
							value={sortBy}
							onChange={setSortBy}
							placeholder="Sort By"
							isDarkMode={isDarkMode}
							className="w-full"
						/>
						<SelectInputField
							options={categoryOptions}
							value={category}
							onChange={setCategory}
							placeholder="All Category"
							isDarkMode={isDarkMode}
							className="w-full"
						/>
						<SelectInputField
							options={ratingOptions}
							value={rating}
							onChange={setRating}
							placeholder="All Ratings"
							isDarkMode={isDarkMode}
							className="w-full"
						/>
					</div>
				</div>

				{currentCourses.length > 0 ? (
					<div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{currentCourses.map((course) => (
								<CourseCard
									userRole="tutor"
									deleteCourseById={(course_id) => {
										setIsDeleteModalOpen(true);
										setSelectedCourseId(course_id);
									}}
									key={course.course_id}
									course={course}
									isDarkMode={isDarkMode}
									onClick={() =>
										navigate(
											`/tutor/my-courses/${course.course_id}`
										)
									}
								/>
							))}
						</div>

						<div className="flex items-center justify-center mt-8 gap-2">
							{Array.from(
								{
									length: Math.ceil(
										courses.length / itemsPerPage
									),
								},
								(_, i) => i + 1
							).map((page) => (
								<button
									key={page}
									onClick={() => paginate(page)}
									className={`w-8 h-8 flex items-center justify-center rounded-full ${
										page === currentPage
											? "bg-orange-500 text-white"
											: isDarkMode
											? "text-gray-300 hover:bg-gray-700"
											: "text-gray-600 hover:bg-gray-100"
									}`}>
									{page}
								</button>
							))}
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center mt-16">
						<h2 className="text-xl font-semibold">
							No courses uploaded yet!
						</h2>
						<p className="text-gray-500 mt-2">
							Start creating your first course and share your
							expertise with the world.
						</p>
					</div>
				)}
			</div>
			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={onClose}
				onConfirm={onConfirm}
				confirmText="Delete"
				cancelText="Cancel"
				title={"Delete Course"}
				icon="danger"
				description="Are you sure you want to delete this course?"
				isDarkMode={isDarkMode}
			/>
		</div>
	);
};

export default MyCourses;
