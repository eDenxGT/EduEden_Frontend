/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
	updateCategory,
	addCategory,
} from "../../../store/slices/categoriesSlice";

const AddCategoryModal = ({ isOpen, onClose, category, isDarkMode }) => {
	const [formData, setFormData] = useState({
		title: category?.title || "",
		description: category?.description || "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const dispatch = useDispatch();

	if (!isOpen) return null;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			if (category) {
				await dispatch(
					updateCategory({ ...formData, _id: category._id })
				).unwrap();
				toast.success("Category updated successfully!");
			} else {
				await dispatch(addCategory(formData)).unwrap();
				toast.success("Category added successfully!");
			}

			onClose(); 
		} catch (error) {
			const errorMessage =
				error?.response?.data?.message || "Something went wrong.";
			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div
				className={`w-full max-w-md rounded-lg ${
					isDarkMode ? "bg-gray-800" : "bg-white"
				} p-6`}>
				<h2 className="text-2xl font-bold mb-4">
					{category ? "Edit Category" : "Add Category"}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<label className="block mb-1">Name</label>
							<input
								type="text"
								value={formData.title}
								onChange={(e) =>
									setFormData({
										...formData,
										title: e.target.value,
									})
								}
								className={`w-full p-2 rounded border ${
									isDarkMode
										? "bg-gray-700 border-gray-600"
										: "bg-white border-gray-300"
								}`}
								disabled={isSubmitting}
							/>
						</div>
						<div>
							<label className="block mb-1">Description</label>
							<textarea
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
								className={`w-full p-2 rounded border ${
									isDarkMode
										? "bg-gray-700 border-gray-600"
										: "bg-white border-gray-300"
								}`}
								rows="3"
								disabled={isSubmitting}
							/>
						</div>
					</div>
					<div className="flex justify-end space-x-2 mt-6">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border rounded hover:bg-gray-100"
							disabled={isSubmitting}>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={
								isSubmitting ||
								formData.title.trim().length === 0 ||
								formData.description.trim().length === 0
							}>
							{isSubmitting
								? "Saving..."
								: category
								? "Update"
								: "Create"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCategoryModal;
