import React, { useEffect, useState } from "react";
import {
	User,
	Mail,
	Phone,
	Briefcase,
	Globe,
	Instagram,
	Linkedin,
	Youtube,
	Lock,
	Camera,
	ArrowRight,
	AlertTriangle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useLoading } from "../../../contexts/LoadingContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputField from "../../../components/CommonComponents/InputField";
import Card from "../../../components/CommonComponents/Card";
import {
	axiosInstance,
	axiosMultipartInstance,
} from "../../../api/axiosConfig";
import { tutorUpdate } from "../../../store/slices/tutorSlice";
import { OTPVerificationModal } from "../../../utils/Modals/ShadOtpModal";
import {
	getFromLocalStorage,
	removeFromLocalStorage,
	saveToLocalStorage,
} from "@/lib/helpers";

const ProfileManagement = () => {
	const { toggleTheme: isDarkMode, tutorData } = useSelector(
		(state) => state.tutor
	);

	const { startLoading, stopLoading } = useLoading();
	const [profileImage, setProfileImage] = useState(tutorData?.avatar || null);
	const [file, setFile] = useState(null);

	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const [formData, setFormData] = useState({
		full_name: tutorData?.full_name || "",
		user_name: tutorData?.user_name || "",
		email: tutorData?.email || "",
		phone: tutorData?.phone || "",
		title: tutorData?.job_title || "",
		website: tutorData?.social_profiles?.personal_website || "",
		instagram: tutorData?.social_profiles?.instagram || "",
		linkedin: tutorData?.social_profiles?.linkedin || "",
		whatsapp: tutorData?.social_profiles?.whatsapp || "",
		youtube: tutorData?.social_profiles?.youtube || "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
		biography: tutorData?.bio || "",
	});
	const [errors, setErrors] = useState({
		full_name: "",
		user_name: "",
		email: "",
		phone: "",
		title: "",
		website: "",
		instagram: "",
		linkedin: "",
		whatsapp: "",
		youtube: "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
		biography: "",
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
	const [fieldToVerify, setFieldToVerify] = useState(null);
	const [valueToVerify, setValueToVerify] = useState("");
	const [verifiedFields, setVerifiedFields] = useState({
		email: false,
		phone: false,
	});

	const validateField = (name, value) => {
		let error = "";
		switch (name) {
			case "full_name":
				if (value.length < 3) error = "At least 3 characters";
				break;
			case "user_name":
				if (!/^[a-z._]+$/.test(value) && value.length !== 0)
					error =
						"Only lowercase letters, underscores and dots allowed";
				break;
			case "email":
				if (
					!value.includes("@") ||
					!value.includes(".") ||
					/[^a-zA-Z0-9@.]/.test(value)
				) {
					error = "Invalid email address";
				}
				break;
			case "phone":
				if (!/^\d+$/.test(value) || value.length !== 10)
					error = "Must be 10 digits";
				break;
			case "website":
			case "youtube":
			case "whatsapp":
			case "linkedin":
			case "instagram":
				if (!/^https?:\/\/.+/.test(value) && value.length !== 0)
					error = "Enter a valid link";
				break;
			case "currentPassword":
				if (value && value.length < 6 && value.length !== 0)
					error = "At least 6 characters";
				break;
			case "newPassword":
				if (value && value.length < 6 && value.length !== 0)
					error = "At least 6 characters";
				break;
			case "confirmPassword":
				if (value !== formData.newPassword && value.length !== 0)
					error = "Passwords do not match";
				break;
			default:
				break;
		}
		return error;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		const error = validateField(name, value);
		setErrors((prev) => ({ ...prev, [name]: error }));

		const newErrors = { ...errors, [name]: error };
		setIsFormValid(Object.values(newErrors).every((err) => !err));

		if (name === "email" || name === "phone") {
			setVerifiedFields((prev) => ({ ...prev, [name]: false }));
		}
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.info("Image size must be less than 5MB");
				return;
			}
			if (!["image/jpeg", "image/png"].includes(file.type)) {
				toast.info("Invalid file type. Only JPEG, or PNG are allowed.");
				return;
			}
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result);
			};
			reader.readAsDataURL(file);
			setFile(file);
		}
	};

	const handleUploadToCloudinary = async () => {
		try {
			const sanitizedName = file.name
				.replace(/[^a-z0-9.\-_]/gi, "")
				.slice(0, 30);
			const public_id = `tutor_avatar_${sanitizedName}_${Date.now()}`;
			const folder = "profile_images";
			const timestamp = Math.floor(Date.now() / 1000);
			const transformation = "c_fill,w_500,h_500,g_face,r_max,f_auto";

			const response = await axiosInstance.post(
				"api/upload/generate-sign",
				{
					folder,
					timestamp,
					public_id,
					transformation,
				}
			);

			if (response.status !== 200) {
				toast.error("Something went wrong while uploading the image.");
				return;
			}

			const { apiKey, cloudName, signature } = response.data;

			const data = new FormData();
			data.append("file", file);
			data.append("folder", folder);
			data.append("signature", signature);
			data.append("api_key", apiKey);
			data.append("public_id", public_id);
			data.append("timestamp", timestamp);
			data.append("transformation", transformation);

			const cloudinaryResponse = await axiosMultipartInstance.post(
				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
				data
			);

			return cloudinaryResponse.data;
		} catch (error) {
			console.error("Cloudinary Upload Error: ", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!isFormValid) {
			toast.error("Please correct the errors in the form");
			return;
		}

		if (formData.email !== tutorData.email && !verifiedFields.email) {
			toast.error("Please verify your new email address");
			return;
		}

		if (formData.phone !== tutorData.phone && !verifiedFields.phone) {
			toast.error("Please verify your new phone number");
			return;
		}

		startLoading();
		try {
			const updatedFields = {};

			Object.keys(formData).forEach((key) => {
				if (formData[key] !== tutorData[key]) {
					updatedFields[key] = formData[key];
				}
			});

			if (file) {
				const imageUploaded = await handleUploadToCloudinary();
				if (!imageUploaded) {
					return toast.error(
						"Something went wrong while uploading the image."
					);
				}
				updatedFields.avatar = imageUploaded.secure_url;
			}

			if (Object.keys(updatedFields).length === 0) {
				toast.info("No changes detected to update.");
				return;
			}

			updatedFields.tutorId = tutorData._id;

			const response = await axiosInstance.put(
				"/tutor/update-profile",
				updatedFields
			);

			if (response.status !== 200) {
				toast.error("Failed to update profile");
				return;
			}

			dispatch(tutorUpdate(response.data.tutorData));

			console.log("Profile Updated: ", response.data);
			toast.success("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error(
				error?.response?.data?.message || "Failed to update profile"
			);
		} finally {
			stopLoading();
		}
	};

	const handleVerify = async () => {
		setFieldToVerify("email");
		console.log(formData.email);
		setValueToVerify(formData.email);
		onSendOTP(formData.email);
	};

	const onSendOTP = async () => {
		try {
			const payload = {
				role: "tutor",
				email: formData.email,
			};

			const response = await axiosInstance.post(
				"/auth/send-otp-profile-update",
				payload
			);

			if (response.status === 200) {
				setIsOTPModalOpen(true);
				toast.success(response?.data?.message);
				saveToLocalStorage("isOtpModalOpen", true);
				saveToLocalStorage("emailField", valueToVerify);
			}
		} catch (error) {
			console.error("Error sending OTP:", error);
			toast.error(error?.response?.data?.message || "Failed to send OTP");
		}
	};

	const onClose = () => {
		setValueToVerify("");
		setIsOTPModalOpen(false);
		removeFromLocalStorage("isOtpModalOpen");
		removeFromLocalStorage("emailField");
	};

	const onVerifyOTP = async (_, value, otp) => {
		try {
			const payload = {
				otp,
				email: value,
				role: "tutor",
				user_id: tutorData.user_id,
			};

			const response = await axiosInstance.post(
				"/auth/verify-otp-profile-update",
				payload
			);

			if (response.status === 200) {
				setVerifiedFields((prev) => ({
					...prev,
					email: true,
				}));
				setFormData((prev) => ({
					...prev,
					email: value,
				}))
				localStorage.removeItem("otpTimestamp");
				setTimeout(() => {
					toast.success(response?.data?.message);
					onClose();
				}, 1500);
			}
			return true;
		} catch (error) {
			console.error("Error verifying OTP:", error);
			toast.error(
				error?.response?.data?.message || "Failed to verify OTP"
			);
			return false;
		}
	};

	useEffect(() => {
		const savedEmail = getFromLocalStorage("emailField");
		const savedOtpModalState = getFromLocalStorage("isOtpModalOpen");

		if (savedEmail) {
			setFormData((prev) => ({ ...prev, email: savedEmail }));
		}
		if (savedOtpModalState === "true") {
			setIsOTPModalOpen(true);
		}
	}, []);

	return (
		<div
			className={`${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-50 text-gray-900"
			}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
				<Card
					className={`mb-8 p-8 ${
						isDarkMode ? "bg-gray-800" : "bg-white"
					} shadow-md rounded-lg`}>
					<div className="space-y-4">
						<h2
							className={`text-xl font-semibold pb-4 border-b ${
								isDarkMode
									? "border-gray-700"
									: "border-gray-200"
							}`}>
							Profile Management
						</h2>

						<div
							className={`flex items-center border-b-[1px] w-fit ${
								isDarkMode
									? "border-gray-400"
									: "border-gray-300"
							} text-sm`}>
							<Link
								to="/tutor/settings"
								className={`${
									isDarkMode
										? "text-gray-400 hover:text-gray-300"
										: "text-gray-500 hover:text-gray-800"
								}`}>
								Settings
							</Link>
							<ArrowRight className="w-4 h-4 mt-1 mx-1" />
							<span
								className={`hover:cursor-pointer ${
									isDarkMode
										? "text-gray-200"
										: "text-gray-900"
								}`}>
								Profile
							</span>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="md:col-span-2 space-y-6">
								<div className="space-y-2">
									<Label htmlFor="full_name">Full Name</Label>
									<div className="relative">
										<User
											className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<Input
											id="full_name"
											name="full_name"
											value={formData.full_name}
											onChange={handleChange}
											placeholder="Enter your full name"
											className={`pl-10 ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
									</div>
									{errors.full_name && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.full_name}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="user_name">Username</Label>
									<div className="relative">
										<User
											className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<Input
											id="user_name"
											name="user_name"
											value={formData.user_name}
											onChange={handleChange}
											placeholder="Enter your username"
											className={`pl-10 ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
									</div>
									{errors.user_name && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.user_name}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<div className="relative">
										<Mail
											className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<Input
											id="email"
											type="email"
											name="email"
											value={
												getFromLocalStorage(
													"emailField"
												) || formData.email
											}
											onChange={handleChange}
											placeholder="Email address"
											className={`pl-10 pr-20 ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
										{formData.email !== tutorData.email &&
											!verifiedFields.email && (
												<Button
													onClick={handleVerify}
													type="button"
													variant="ghost"
													size="sm"
													disabled={
														errors.email && true
													}
													className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 hover:bg-transparent">
													Verify
												</Button>
											)}
									</div>
									{errors.email && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.email}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<div className="relative">
										<Phone
											className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<Input
											id="phone"
											name="phone"
											value={formData.phone}
											onChange={handleChange}
											placeholder="Your Phone Number"
											className={`pl-10 ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
									</div>
									{errors.phone && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.phone}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="title">Title</Label>
									<div className="relative">
										<Briefcase
											className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<Input
											id="title"
											name="title"
											value={formData.title}
											onChange={handleChange}
											placeholder="Your job title, role"
											className={`pl-10 ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
									</div>
									{errors.title && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.title}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="biography">Biography</Label>
									<Textarea
										id="biography"
										name="biography"
										value={formData.biography}
										onChange={handleChange}
										placeholder="Your small biography"
										rows={4}
										className={`resize-none ${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.biography && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.biography}
										</p>
									)}
								</div>
							</div>
							<div className="space-y-6">
								<div className="relative w-48 h-48 mx-auto">
									<div
										className={`w-full h-full rounded-full overflow-hidden ring-4 ${
											isDarkMode
												? "ring-gray-600"
												: "ring-gray-200"
										}`}>
										{profileImage ? (
											<img
												src={profileImage}
												alt="Profile"
												className="w-full h-full object-cover"
											/>
										) : (
											<div
												className={`w-full h-full flex items-center justify-center ${
													isDarkMode
														? "bg-gray-700"
														: "bg-gray-100"
												}`}>
												<User
													className={`w-20 h-20 ${
														isDarkMode
															? "text-gray-500"
															: "text-gray-400"
													}`}
												/>
											</div>
										)}
									</div>
									<label className="absolute bottom-2 right-2 p-2 bg-[#FF5722] hover:bg-[#F4511E] rounded-full cursor-pointer shadow-lg transition-transform duration-200 hover:scale-110">
										<Camera className="w-5 h-5 text-white" />
										<input
											type="file"
											accept="image/*"
											onChange={handleImageUpload}
											className="hidden"
										/>
									</label>
								</div>
								<p
									className={`text-sm ${
										isDarkMode
											? "text-gray-400"
											: "text-gray-500"
									} text-center`}>
									Must be JPEG, PNG, or GIF and cannot exceed
									10MB.
								</p>
							</div>
						</div>

						<Card
							className={`mt-8 p-8 ${
								isDarkMode ? "bg-gray-800" : "bg-white"
							} rounded-lg`}>
							<h2
								className={`text-xl font-semibold mb-8 pb-4 border-b ${
									isDarkMode
										? "border-gray-600"
										: "border-gray-300"
								}`}>
								Social Profile
							</h2>
							<div className="space-y-6">
								<div className="space-y-2">
									<Label htmlFor="website">
										Personal Website
									</Label>
									<div className="relative">
										<Globe
											className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<Input
											id="website"
											type="url"
											name="website"
											value={formData.website}
											onChange={handleChange}
											placeholder="Personal website or portfolio url"
											className={`pl-10 ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
									</div>
									{errors.website && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.website}
										</p>
									)}
								</div>
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="instagram">
											Instagram
										</Label>
										<div className="relative">
											<Instagram
												className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
												size={18}
											/>
											<Input
												id="instagram"
												name="instagram"
												value={formData.instagram}
												onChange={handleChange}
												placeholder="Instagram Link"
												className={`pl-10 ${
													isDarkMode
														? "bg-gray-700 border-gray-600 text-white"
														: "bg-white border-gray-300 text-gray-900"
												}`}
											/>
										</div>
										{errors.instagram && (
											<p className="text-xs text-red-600 flex items-center">
												<AlertTriangle
													size={12}
													className="mr-1"
												/>
												{errors.instagram}
											</p>
										)}
									</div>
									<div className="space-y-2">
										<Label htmlFor="linkedin">
											LinkedIn
										</Label>
										<div className="relative">
											<Linkedin
												className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
												size={18}
											/>
											<Input
												id="linkedin"
												name="linkedin"
												value={formData.linkedin}
												onChange={handleChange}
												placeholder="LinkedIn Link"
												className={`pl-10 ${
													isDarkMode
														? "bg-gray-700 border-gray-600 text-white"
														: "bg-white border-gray-300 text-gray-900"
												}`}
											/>
										</div>
										{errors.linkedin && (
											<p className="text-xs text-red-600 flex items-center">
												<AlertTriangle
													size={12}
													className="mr-1"
												/>
												{errors.linkedin}
											</p>
										)}
									</div>
									<div className="space-y-2">
										<Label htmlFor="whatsapp">
											WhatsApp
										</Label>
										<div className="relative">
											<Phone
												className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
												size={18}
											/>
											<Input
												id="whatsapp"
												name="whatsapp"
												value={formData.whatsapp}
												onChange={handleChange}
												placeholder="https://wa.me/1234567890"
												className={`pl-10 ${
													isDarkMode
														? "bg-gray-700 border-gray-600 text-white"
														: "bg-white border-gray-300 text-gray-900"
												}`}
											/>
										</div>
										{errors.whatsapp && (
											<p className="text-xs text-red-600 flex items-center">
												<AlertTriangle
													size={12}
													className="mr-1"
												/>
												{errors.whatsapp}
											</p>
										)}
									</div>
									<div className="space-y-2">
										<Label htmlFor="youtube">YouTube</Label>
										<div className="relative">
											<Youtube
												className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
												size={18}
											/>
											<Input
												id="youtube"
												name="youtube"
												value={formData.youtube}
												onChange={handleChange}
												placeholder="YouTube Link"
												className={`pl-10 ${
													isDarkMode
														? "bg-gray-700 border-gray-600 text-white"
														: "bg-white border-gray-300 text-gray-900"
												}`}
											/>
										</div>
										{errors.youtube && (
											<p className="text-xs text-red-600 flex items-center">
												<AlertTriangle
													size={12}
													className="mr-1"
												/>
												{errors.youtube}
											</p>
										)}
									</div>
								</div>
							</div>
						</Card>

						<Card
							className={`mt-8 p-8 ${
								isDarkMode ? "bg-gray-800" : "bg-white"
							} rounded-lg`}>
							<h2
								className={`text-xl font-semibold mb-8 pb-4 border-b ${
									isDarkMode
										? "border-gray-700"
										: "border-gray-100"
								}`}>
								Change Password
							</h2>
							<div className="space-y-6">
								<div className="space-y-2">
									<Label htmlFor="currentPassword">
										Current Password
									</Label>
									<div className="relative">
										<Lock
											className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<Input
											id="currentPassword"
											type={
												showPassword.current
													? "text"
													: "password"
											}
											name="currentPassword"
											value={formData.currentPassword}
											onChange={handleChange}
											placeholder="Enter current password"
											className={`pl-10 ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
										<button
											type="button"
											onClick={() =>
												setShowPassword((prev) => ({
													...prev,
													current: !prev.current,
												}))
											}
											className="absolute right-2 top-1/2 transform -translate-y-1/2">
											{showPassword.current
												? "Hide"
												: "Show"}
										</button>
									</div>
									{errors.currentPassword && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.currentPassword}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="newPassword">
										New Password
									</Label>
									<div className="relative">
										<Lock
											className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<Input
											id="newPassword"
											type={
												showPassword.new
													? "text"
													: "password"
											}
											name="newPassword"
											value={formData.newPassword}
											onChange={handleChange}
											placeholder="Enter new password"
											className={`pl-10 ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
										<button
											type="button"
											onClick={() =>
												setShowPassword((prev) => ({
													...prev,
													new: !prev.new,
												}))
											}
											className="absolute right-2 top-1/2 transform -translate-y-1/2">
											{showPassword.new ? "Hide" : "Show"}
										</button>
									</div>
									{errors.newPassword && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.newPassword}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirmPassword">
										Confirm Password
									</Label>
									<div className="relative">
										<Lock
											className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<Input
											id="confirmPassword"
											type={
												showPassword.confirm
													? "text"
													: "password"
											}
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleChange}
											placeholder="Confirm new password"
											className={`pl-10 ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
										<button
											type="button"
											onClick={() =>
												setShowPassword((prev) => ({
													...prev,
													confirm: !prev.confirm,
												}))
											}
											className="absolute right-2 top-1/2 transform -translate-y-1/2">
											{showPassword.confirm
												? "Hide"
												: "Show"}
										</button>
									</div>
									{errors.confirmPassword && (
										<p className="text-xs text-red-600 flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.confirmPassword}
										</p>
									)}
								</div>
							</div>
						</Card>

						<div className="mt-8">
							<Button
								type="submit"
								className="bg-[#FF5722] text-white hover:bg-[#F4511E]"
								// disabled={
								// 	!isFormValid ||
								// 	formData.confirmPassword !==
								// 		formData.newPassword ||
								// 	(formData.newPassword.length > 0 &&
								// 		formData.currentPassword.length ===
								// 			0) ||
								// 	(formData.email !== tutorData.email &&
								// 		!verifiedFields.email) ||
								// 	(formData.phone !== tutorData.phone &&
								// 		!verifiedFields.phone)
								// }
								>
								Save Changes
							</Button>
						</div>
					</form>
				</Card>
			</div>
			<OTPVerificationModal
				isOpen={isOTPModalOpen}
				onClose={onClose}
				fieldToVerify={fieldToVerify}
				value={valueToVerify}
				isDarkMode={isDarkMode}
				onReSendOTP={onSendOTP}
				onVerifyOTP={onVerifyOTP}
			/>
		</div>
	);
};

export default ProfileManagement;
