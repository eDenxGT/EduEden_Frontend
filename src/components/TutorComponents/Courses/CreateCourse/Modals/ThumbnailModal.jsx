/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { updateLecture } from "../../../../../store/slices/newCourse";

const ThumbnailUploadModal = ({ isOpen, onClose, lectureId }) => {
	const fileInputRef = useRef(null);
	const lectures = useSelector((state) => state.newCourse.lectures);
	const selectedLecture = lectures.find(
		(lecture) => lecture._id === lectureId
	);
	const dispatch = useDispatch();

	if (!isOpen) return null;

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(
				updateLecture({
					lectureId,
					updatedData: { video_thumbnail: file },
				})
			);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("image/")) {
			dispatch(
				updateLecture({
					lectureId,
					updatedData: { video_thumbnail: file },
				})
			);
		} else {
			toast.error("Please drop an image file");
		}
	};

	const handleBrowseClick = () => {
		fileInputRef.current.click();
	};

  const onRemove = () => {
    dispatch(
      updateLecture({
        lectureId,
        updatedData: { video_thumbnail: "" },
      })
    );
  }

	const handleSubmit = () => {
    if (selectedLecture.video_thumbnail) {
      onClose();
      return toast.success("Thumbnail added successfully!");
    }
    return toast.error("Please upload a thumbnail.");
  };

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-md">
				<div className="flex justify-between items-center p-4">
					<h2 className="text-xl">Add Thumbnail</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700">
						✕
					</button>
				</div>

				<div
					className="p-8"
					onDragOver={handleDragOver}
					onDrop={handleDrop}>
					<div className="text-center">
						<h3 className="text-lg mb-4">Upload Thumbnail</h3>
						<div className="border-2 border-dashed border-gray-300 p-8 rounded-sm">
							<p className="text-gray-600">
								Drag and drop a file or{" "}
								<button
									onClick={handleBrowseClick}
									className="text-blue-500 hover:text-blue-600">
									browse file
								</button>
							</p>
							{selectedLecture.video_thumbnail && (
								<p className="mt-2 text-sm text-gray-500">
									Selected:{" "}
									{selectedLecture.video_thumbnail.name}
								</p>
							)}
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleFileChange}
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-between p-4">
					<button
						onClick={onRemove}
						className="px-4 py-2 bg-red-200 hover:bg-red-300 text-red-700">
						Remove
					</button>
					<button
						onClick={handleSubmit}
						className="px-4 py-2 bg-orange-200 text-orange-700 hover:bg-orange-300">
						Add Thumbnail
					</button>
				</div>
			</div>
		</div>
	);
};

export default ThumbnailUploadModal;
