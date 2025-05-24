/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../CommonComponents/Button";
import SelectInputField from "../../../CommonComponents/SelectInputField";
import { Trash } from "lucide-react";
import DescriptionModal from "./Modals/DescriptionModal";
import NotesModal from "./Modals/NotesModal";
import ThumbnailModal from "./Modals/ThumbnailModal";
import LectureVideoModal from "./Modals/VideoModal";
import {
	addLecture,
	updateLecture,
	removeLecture,
} from "../../../../store/slices/newCourse";

const LectureAddingPage = ({ goToPreviousPage, goToNextPage, isDarkMode }) => {
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
	const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
	const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
	const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
	const [selectedLectureId, setSelectedLectureId] = useState(null);

	const { lectures } = useSelector((state) => state.newCourse);
	useEffect(() => {
		console.log(lectures);
	});
	const dispatch = useDispatch();

	const closeModals = () => {
		setIsVideoModalOpen(false);
		setIsDescriptionModalOpen(false);
		setIsNotesModalOpen(false);
		setIsThumbnailModalOpen(false);
		setSelectedLectureId(null);
	};

	const handleOptionChange = (option, lectureId) => {
		switch (option) {
			case "Attach Video":
				setSelectedLectureId(lectureId);
				setIsVideoModalOpen(true);
				break;
			case "Description":
				setSelectedLectureId(lectureId);
				setIsDescriptionModalOpen(true);
				break;
			case "Lecture Notes":
				setSelectedLectureId(lectureId);
				setIsNotesModalOpen(true);
				break;
			case "Thumbnail":
				setSelectedLectureId(lectureId);
				setIsThumbnailModalOpen(true);
				break;
			default:
				console.log("Invalid option selected.");
				break;
		}
	};

	const handleAddLecture = () => {
		dispatch(
			addLecture({
				title: `Lecture ${lectures.length + 1}`,
				description: "",
				duration: "",
				pdfNotes: "",
			})
		);
	};

	const handleDeleteLecture = (lectureId) => {
		const confirmDelete = confirm(
			"Are you sure you want to delete this lecture?"
		);
		if (confirmDelete) {
			dispatch(removeLecture(lectureId));
		}
	};

	const handleLectureTitleChange = (e, lectureId) => {
		dispatch(
			updateLecture({
				lectureId: lectureId,
				updatedData: { title: e.target.value },
			})
		);
	};

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				{lectures.map((lecture) => (
					<div
						key={lecture._id}
						className={`flex justify-between items-center border rounded-none ${
							isDarkMode
								? "bg-gray-800 border-gray-700"
								: "bg-white border-gray-300"
						}`}>
						<input
							placeholder="Enter lecture name"
							className={`flex-grow p-4 ${
								isDarkMode ? "text-white" : "text-gray-900"
							}`}
							value={lecture.title}
							onChange={(e) =>
								handleLectureTitleChange(e, lecture._id)
							}
						/>
						<div className="flex space-x-2 items-center">
							<SelectInputField
								options={[
									"Attach Video",
									"Description",
									"Lecture Notes",
									"Thumbnail",
								]}
								value=""
								onChange={(option) =>
									handleOptionChange(option, lecture._id)
								}
								isDarkMode={isDarkMode}
								placeholder="Contents"
								className="max-w-fit rounded-none"
								listClassName="w-44 max-w-max"
							/>

							<button
								onClick={() => handleDeleteLecture(lecture._id)}
								className={`p-2 pr-4 rounded-full ${
									isDarkMode
										? "text-gray-400 hover:text-gray-300"
										: "text-gray-600 hover:text-gray-800"
								}`}>
								<Trash size={18} />
							</button>
						</div>
					</div>
				))}
				<div className="flex justify-center">
					<Button
						text="Add Lecture"
						className="px-4 py-2 bg-orange-600 text-white hover:opacity-80 max-w-fit"
						onClick={handleAddLecture}
					/>
				</div>
			</div>
			<div className="flex justify-between mt-6">
				<Button
					text="Previous"
					className={`${
						isDarkMode
							? "bg-gray-700 text-gray-300 hover:bg-gray-600"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					} max-w-fit px-6 transition-colors duration-200`}
					onClick={goToPreviousPage}
				/>
				<Button
					text="Save & Next"
					className={`max-w-fit px-6 ${
						isDarkMode
							? "bg-orange-600 text-white hover:bg-orange-700"
							: "bg-orange-600 text-white hover:bg-orange-600"
					} transition-colors duration-200`}
					onClick={goToNextPage}
				/>
			</div>
			{/* Modals */}
			{isVideoModalOpen && (
				<LectureVideoModal
					lectureId={selectedLectureId}
					onClose={closeModals}
					isOpen={isVideoModalOpen}
				/>
			)}
			{isDescriptionModalOpen && (
				<DescriptionModal
					type="Description"
					lectureId={selectedLectureId}
					onClose={closeModals}
					isOpen={isDescriptionModalOpen}
				/>
			)}
			{isNotesModalOpen && (
				<NotesModal
					type="Notes"
					isOpen={isNotesModalOpen}
					lectureId={selectedLectureId}
					onClose={closeModals}
				/>
			)}
			{isThumbnailModalOpen && (
				<ThumbnailModal
					type="Thumbnail"
					isOpen={isThumbnailModalOpen}
					lectureId={selectedLectureId}
					onClose={closeModals}
				/>
			)}
		</div>
	);
};

export default LectureAddingPage;
