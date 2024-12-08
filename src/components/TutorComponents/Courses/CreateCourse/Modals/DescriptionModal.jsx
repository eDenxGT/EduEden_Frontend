/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { updateLecture } from "../../../../../store/slices/newCourse";
import { toast } from "sonner";

const DescriptionModal = ({ isOpen, onClose, lectureId }) => {
	const lectures = useSelector((state) => state.newCourse.lectures);
	const selectedLecture = lectures.find(
		(lecture) => lecture._id === lectureId
	);

	const dispatch = useDispatch();

	if (!isOpen) return null;

	const handleChangeDescription = (value) => {
		dispatch(
			updateLecture({ lectureId, updatedData: { description: value } })
		);
	};
  const onRemove = () => {
    dispatch(
      updateLecture({
        lectureId,
        updatedData: { description: "" },
      })
    );
  }
	const handleSubmit = () => {
		if (selectedLecture.description.trim().split(" ").length >= 3) {
			onClose();
			return toast.success("Lecture description added successfully!");
		}
    return toast.info("Please enter a description with at least 3 words.");
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-md">
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl font-semibold">
						Add Lecture Description
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700">
						✕
					</button>
				</div>

				<div className="p-4">
					<div className="space-y-2">
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							id="description"
							rows="6"
							className="w-full border p-2 text-gray-900 focus:outline-none"
							placeholder="Write your lecture description here..."
							value={selectedLecture?.description}
							onChange={(e) =>
								handleChangeDescription(e.target.value)
							}
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
						onClick={handleSubmit}
						className="px-4 py-2 bg-orange-200 text-orange-700 hover:bg-orange-300">
						Add Description
					</button>
				</div>
			</div>
		</div>
	);
};

export default DescriptionModal;
