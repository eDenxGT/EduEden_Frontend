/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLecture } from "../../../../../store/slices/newCourse";
import { toast } from "sonner";

const NotesModal = ({ isOpen, onClose, lectureId }) => {
	const fileInputRef = useRef(null);
	const dropZoneRef = useRef(null);
	const lectures = useSelector((state) => state.newCourse.lectures);
	const dispatch = useDispatch();

	const selectedLecture = lectures.find(
		(lecture) => lecture._id === lectureId
	);

	if (!isOpen) return null;

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(
				updateLecture({ lectureId, updatedData: { pdf_notes: file } })
			);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dropZoneRef.current.classList.add("border-gray-400");
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dropZoneRef.current.classList.remove("border-gray-400");
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dropZoneRef.current.classList.remove("border-gray-400");

		const file = e.dataTransfer.files[0];
		if (file) {
			dispatch(
				updateLecture({ lectureId, updatedData: { pdf_notes: file } })
			);
		}
	};

	const handleBrowseClick = () => {
		fileInputRef.current.click();
	};

  const onRemove = () => {
    dispatch(
      updateLecture({
        lectureId,
        updatedData: { pdf_notes: "" },
      })
    );
  }

	const handleAddNotes = () => {
		if (selectedLecture.pdf_notes) {
			onClose()
      return toast.success("Lecture notes added successfully!"); 
		}
    return toast.info("Please upload a notes file.");
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-md">
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl font-semibold">Add Lecture Notes</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700">
						✕
					</button>
				</div>

				<div className="p-4">
					<div
						ref={dropZoneRef}
						className="border-2 border-dashed border-gray-300 p-8 text-center"
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}>
						<div className="space-y-4">
							<h3 className="text-lg font-medium">
								Uploads Notes
							</h3>
							<p className="text-gray-500">
								Drag and drop a file or{" "}
								<button
									onClick={handleBrowseClick}
									className="text-blue-500 hover:text-blue-600">
									browse file
								</button>
							</p>
							{selectedLecture.pdf_notes && (
								<p className="text-sm text-gray-600">
									Selected: {selectedLecture.pdf_notes.name}
								</p>
							)}
						</div>
						<input
							ref={fileInputRef}
							type="file"
							className="hidden"
							onChange={handleFileChange}
						/>
					</div>
				</div>

				<div className="flex justify-between p-4 border-t">
        <button
						onClick={onRemove}
						className="px-4 py-2 bg-red-200 hover:bg-red-300 text-red-700">
						Remove
					</button>
					<button
						onClick={handleAddNotes}
						className="px-4 py-2 bg-orange-200 text-orange-700 hover:bg-orange-300">
						Add Notes
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotesModal;
