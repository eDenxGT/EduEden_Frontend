/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import InputField from "../../../CommonComponents/InputField";
import Button from "../../../CommonComponents/Button";
import {
	BookOpenText,
	ImageIcon,
	IndianRupee,
	LanguagesIcon,
	Layers3,
	LucideCaptions,
	NotepadText,
	Settings2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, updateCourse } from "../../../../store/thunks/courseThunks";
import { resetFormData, updateFormData } from "../../../../store/slices/updateCourse";
import { toast } from "sonner";
import { updateLectures } from "../../../../store/thunks/lectureThunks";
import LoadingUiWithText from "../../../../utils/Modals/LoadingUiWithText";
import { useNavigate } from "react-router-dom";

const PublishCoursePage = ({ isDarkMode }) => {
	const { ...formData } = useSelector((state) => state.updateCourse);
	const [priceError, setPriceError] = useState("");
	const dispatch = useDispatch();
	const { user_id } = useSelector((state) => state.tutor.tutorData);
	const [loadingText, setLoadingText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate()

	useEffect(() => {
		console.log("Formdata,", formData);
	}, [formData]);

	const handleCourseSubmit = async () => {
		if (priceError) {
			return toast.error("Please enter a valid price");
		}

		const { lectures, ...courseDetails } = formData;
		const courseData = { ...courseDetails, tutor_id: user_id };
		console.log("Course submit", courseData, "Lectures", lectures);
		try {
			console.log(lectures);
			
			setLoadingText("Updating course...");
			setIsLoading(true);
			await dispatch(updateCourse(courseData)).unwrap();
			// toast.success("Course created successfully!");
			setLoadingText("Uploading lectures...");
			await dispatch(updateLectures(lectures)).unwrap();
			toast.success("Course updated successfully!");
			await dispatch(resetFormData()).unwrap();
		} catch (error) {
			console.log("Course Publishing Error", error);
		} finally {
			setLoadingText("");
			setIsLoading(false);
				navigate(`/tutor/my-courses/${courseData.course_id}`)
		}
	};

	const handlePriceChange = (e) => {
		const value = e.target.value;
		const numValue = Number(value);

		if (numValue > 49999) {
			setPriceError("Price cannot exceed ₹49,999");
			return;
		}
		if (numValue < 0) {
			setPriceError("Enter a valid price");
			return;
		}

		setPriceError("");
		dispatch(
			updateFormData({
				name: "price",
				value: numValue ? numValue : "",
			})
		);
	};

	

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-3 gap-6">
				<div className="col-span-2 space-y-4">
					<InputField
						icon={<BookOpenText size={18} />}
						label="Title"
						value={formData?.title}
						className={`${
							isDarkMode
								? "bg-gray-700 border-gray-600 text-white"
								: "bg-white border-gray-300 text-gray-900"
						}`}
						readOnly
					/>
					<div className="relative">
						<label className="block text-xs font-medium text-gray-700 mb-0">
							Description
						</label>
						<NotepadText
							size={18}
							className="absolute left-2.5 top-7 text-gray-400"
						/>
						<textarea
							value={formData?.course_description}
							className={`${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							} w-full h-fit rounded-none p-2 pl-8 border resize-none`}
							readOnly
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<InputField
							icon={<Layers3 size={18} />}
							label="Course Category"
							value={formData?.category}
							className={`${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							}`}
							readOnly
						/>
						<InputField
							label="Course Language"
							icon={<LanguagesIcon size={16} />}
							value={formData?.language}
							className={`${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							}`}
							readOnly
						/>
						<InputField
							label="Course Level"
							icon={<Settings2 size={16} />}
							value={formData?.level}
							className={`${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							}`}
							readOnly
						/>
						<InputField
							label="Number of Lectures"
							icon={<LucideCaptions size={18} />}
							value={formData?.lectures.length}
							className={`${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							}`}
							readOnly
						/>
					</div>
					<div className="space-y-2">
						<InputField
							type="text"
							label="Course Price"
							icon={<IndianRupee size={16} />}
							value={formData?.price}
							onChange={handlePriceChange}
							className={`${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							}`}
							placeholder="Enter Course Price in INR"
						/>
						{priceError && (
							<p className="text-red-500 text-sm mt-1">
								{priceError}
							</p>
						)}
						{formData?.price && !priceError && (
							<div
								className={`text-xs ${
									isDarkMode
										? "text-gray-300"
										: "text-gray-600"
								}`}>
								<p>Base Price: ₹{formData?.price}</p>
								<p>
									GST (3%): ₹
									{(formData?.price * 0.03).toFixed(2)}
								</p>
								<p>
									EduEden Fee (10%): ₹
									{(formData?.price * 0.1).toFixed(2)}
								</p>
								<p className="font-medium">
									Your Profit: ₹
									{(
										formData?.price -
										formData?.price * 0.13
									).toFixed(2)}
								</p>
							</div>
						)}
						<div className="flex gap-2 mt-2">
							{[499, 999, 1999, 2999].map((suggestedPrice) => (
								<button
									key={suggestedPrice}
									type="button"
									onClick={() =>
										dispatch(
											updateFormData({
												name: "price",
												value: suggestedPrice,
											})
										)
									}
									className={`text-sm px-3 py-1 rounded-md border ${
										isDarkMode
											? "border-gray-600 hover:bg-gray-700 text-gray-300"
											: "border-gray-300 hover:bg-gray-100 text-gray-700"
									}`}>
									₹{suggestedPrice}
								</button>
							))}
						</div>
					</div>
				</div>
				<div className="text-center">
					<label className="block text-xs font-medium mb-1">
						Course Thumbnail
					</label>
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
							className="mx-auto mb-2 w-fit h-32 object-fill"
						/>
					) : (
						<div className="w-32 h-32 mx-auto mb-2 flex items-center justify-center bg-gray-100">
							<ImageIcon className="w-12 h-12 text-gray-400" />
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-between mt-6">
				<Button
					text="Prev Step"
					className={`${
						isDarkMode
							? "bg-gray-700 text-gray-300 hover:bg-gray-600"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					} max-w-fit px-6`}
				/>
				<Button
					text="Submit"
					onClick={handleCourseSubmit}
					className={`max-w-fit px-6 ${
						isDarkMode
							? "bg-orange-600 text-white hover:bg-orange-700"
							: "bg-orange-500 text-white hover:bg-orange-600"
					}`}
				/>
			</div>
			{isLoading && <LoadingUiWithText text={loadingText} />}
		</div>
	);
};

export default PublishCoursePage;
