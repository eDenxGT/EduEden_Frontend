/* eslint-disable react/prop-types */
import { useRef } from "react";
import Button from "../../../CommonComponents/Button";
import { Image, Upload } from "lucide-react";
import { updateFormData } from "../../../../store/slices/newCourse";
import { useDispatch, useSelector } from "react-redux";

const AdvanceInformation = ({ goToPreviousPage, goToNextPage, isDarkMode }) => {
	const inputRef = useRef();
	const dispatch = useDispatch();
	const { ...formData } = useSelector((state) => state.newCourse);
	const handleChange = (field, value) => {
		dispatch(updateFormData({ name: field, value }));
	};

	const onFileUploadButtonClick = () => {
		inputRef.current.click();
	};
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const thumbnail_preview = URL.createObjectURL(file);
			handleChange("course_thumbnail", file);
			handleChange("course_thumbnail_preview", thumbnail_preview);
		}
	};

	return (
		<div className="space-y-6">
			<form className="space-y-4">
				<div className="space-y-2 flex justify-center  items-center">
					<div className="flex flex-col text-wrap max-w-96">
						<label
							className={`block text-sm font-medium mb-1 ${
								isDarkMode ? "text-white" : "text-gray-900"
							}`}>
							Course Thumbnail
						</label>
						<div
							className={`border rounded-none p-4 text-center ${
								isDarkMode
									? "border-gray-700 bg-gray-800"
									: "border-gray-300 bg-gray-100"
							}`}>
							{formData?.course_thumbnail ? (
								<img
									src={
										typeof formData?.course_thumbnail ===
										"string"
											? formData?.course_thumbnail
											: typeof formData?.course_thumbnail_preview ===
													"string" &&
											  formData?.course_thumbnail_preview
									}
									alt="Course Thumbnail"
									className="mx-auto mb-2"
								/>
							) : (
								<Image />
							)}
							<p
								className={`text-xs ${
									isDarkMode
										? "text-gray-400"
										: "text-gray-500"
								}`}>
								Upload your course Thumbnail here. Important
								guidelines: 1200x800 pixels or 12:8 Ratio.
								Supported format: .jpg, .jpeg, or .png
							</p>
							<Button
								text="Upload Image"
								className={`mt-2 ${
									isDarkMode
										? "bg-orange-600 hover:bg-orange-700"
										: "bg-orange-100 hover:bg-orange-200 border text-orange-500 border-orange-300 hover:border-orange-400"
								} text-white max-w-fit px-4`}
								onClick={onFileUploadButtonClick}
								icon={<Upload size={16} />}>
								<input
									ref={inputRef}
									type="file"
									accept=".jpg,.jpeg,.png"
									onChange={handleFileUpload}
									className="hidden"
								/>
							</Button>
						</div>
					</div>
				</div>
				<hr />
				<div>
					<label
						htmlFor="description"
						className={`block text-sm font-medium mb-1 ${
							isDarkMode ? "text-gray-300" : "text-gray-700"
						}`}>
						Course Descriptions
					</label>
					<textarea
						id="description"
						placeholder="Enter your course description"
						value={formData?.course_description}
						onChange={(e) =>
							handleChange("course_description", e.target.value)
						}
						rows={5}
						className={`block w-full p-3 rounded-none ${
							isDarkMode
								? "bg-gray-700 border-gray-600 text-white"
								: "bg-white border-gray-300 text-gray-900"
						} focus:ring-orange-500 border focus:border-orange-500`}></textarea>
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
								: "bg-orange-500 text-white hover:bg-orange-600"
						} transition-colors duration-200`}
						onClick={(e) => {
							e.preventDefault();
							goToNextPage();
						}}
					/>
				</div>
			</form>
		</div>
	);
};

export default AdvanceInformation;
