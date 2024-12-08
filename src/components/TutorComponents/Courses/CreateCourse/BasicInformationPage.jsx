/* eslint-disable react/prop-types */
import InputField from "../../../CommonComponents/InputField";
import Button from "../../../CommonComponents/Button";
import SelectInputField from "../../../CommonComponents/SelectInputField";
import { BookOpenText } from "lucide-react";
import { fetchCategories } from "../../../../store/slices/categoriesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFormData, updateFormData } from "../../../../store/slices/newCourse";
import { useNavigate } from "react-router-dom";
const BasicInformationPage = ({
	goToNextPage,
	isDarkMode,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const {...formData} = useSelector((state) => state.newCourse);
	const handleChange = (field, value) => {
		dispatch(updateFormData({ name: field, value }));
	 };

	 const handleCancelCreateCourse = async() =>{
		try {
			await dispatch(resetFormData()).unwrap()
			goToNextPage(1);
		} catch (error) {
			console.log(error)
		} finally {
			navigate('/tutor/my-courses')
		}	
	 }
	 

  const { categories } = useSelector((state) => state.categories);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<div className="space-y-6">
			<form className="space-y-4">
				<InputField
					label="Title"
					placeholder="Your course title"
					value={formData?.title}
					onChange={(e) => handleChange("title", e.target.value)}
					icon={<BookOpenText size={18} />}
					className={`${
						isDarkMode
							? "bg-gray-700 border-gray-600 text-white"
							: "bg-white border-gray-300 text-gray-900"
					}`}
				/>
				<div className="grid grid-cols-2 gap-4">
					<SelectInputField
						label="Course Category"
						options={categories.map((category)=> category?.title)}
						value={formData?.category}
						onChange={(value) => handleChange("category", value)}
						isDarkMode={isDarkMode}
						placeholder="Select category"
					/>
					<SelectInputField
						label="Course Language"
						options={["English", "Malayalam"]}
						value={formData?.language}
						onChange={(value) => handleChange("language", value)}
						isDarkMode={isDarkMode}
						placeholder="Select language"
					/>
					<SelectInputField
						label="Course Duration"
						options={[
							"3 Days",
							"1 Week",
							"2 Weeks",
							"4 Weeks",
							"2 Months",
							"3 Months",
						]}
						value={formData?.duration}
						onChange={(value) => handleChange("duration", value)}
						isDarkMode={isDarkMode}
						placeholder="Select duration"
					/>
					<SelectInputField
						label="Course Level"
						options={[
							"Beginner",
							"Intermediate",
							"Advanced",
							"Master",
						]}
						value={formData?.level}
						onChange={(value) => handleChange("level", value)}
						isDarkMode={isDarkMode}
						placeholder="Select level"
					/>
				</div>
				<div className="flex justify-between mt-6">
					<Button
					onClick={handleCancelCreateCourse}
						text="Cancel"
						className={`${
							isDarkMode
								? "bg-gray-700 text-gray-300 hover:bg-gray-600"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						} max-w-fit px-6 transition-colors duration-200`}
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

export default BasicInformationPage;
