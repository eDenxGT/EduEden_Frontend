import { useState } from "react";
import {
	Lock,
	Eye,
	EyeOff,
	ArrowRight,
	Mail,
	AlertTriangle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../api/axiosConfig";
import Spinner from "../../../utils/Spinner/Spinner";
import { adminLogin } from "../../../store/slices/adminSlice";
import storeAccessToken from "../../../api/storeAccessToken";

export default function AdminSignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		remember: false,
	});
	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const isDarkMode = useSelector((state) => state.admin.toggleTheme);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		let error = "";
		if (name === "email" && value.length < 3) {
			error = "Enter username or email";
		} else if (name === "password" && value.length < 6) {
			error = "Password must be at least 6 characters";
		}

		setErrors((prev) => ({ ...prev, [name]: error }));
		setIsFormValid(
			Object.values({ ...errors, [name]: error }).every((err) => !err) &&
				formData.email.length > 0 &&
				formData.password.length > 0
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!isFormValid) return;

		try {
			const response = await axiosInstance.post(
				"/auth/admin/signin",
				formData
			);
			if (response?.data?.success === true) {
				const accessToken = response?.data?.accessToken;
				if (!accessToken) {
					throw new Error("Access token not provided in response.");
				}
				toast.success("Sign-in successful");
				storeAccessToken("admin", accessToken, 13);
				dispatch(adminLogin(response.data));
				navigate("/admin/dashboard");
			}
		} catch (error) {
			console.error("Sign-in error:", error);
			const errorMessage =
				error?.response?.data?.message ||
				"An error occurred during sign-in.";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={`min-h-screen flex justify-center ${
				isDarkMode
					? "dark bg-gray-900"
					: "bg-gradient-to-b from-gray-100 to-gray-200"
			}`}>
			<div className="container  mx-auto flex items-center justify-center px-16">
				<div
					className={`max-w-md mx-auto rounded-lg shadow-lg overflow-hidden ${
						isDarkMode ? "bg-gray-800" : "bg-white"
					}`}>
					<div className={`p-8`}>
						<div className="flex justify-center items-center mb-8">
							<div className="flex items-center justify-center gap-3">
								<span
									className={`${
										isDarkMode && "text-white"
									} text-2xl font-bold `}>
									Admin{" "}
									<span
										className={
											isDarkMode
												? "text-blue-400"
												: "text-[#ff6b35]"
										}>
										Panel
									</span>
								</span>
							</div>
						</div>

						<h2
							className={`text-3xl font-bold mb-6 ${
								isDarkMode ? "text-white" : "text-gray-800"
							}`}>
							Sign in to Dashboard
						</h2>

						<div className="space-y-6">
							<div className="flex items-center gap-4"></div>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label
										htmlFor="email"
										className={`block text-sm font-medium mb-2 ${
											isDarkMode
												? "text-gray-300"
												: "text-gray-700"
										}`}>
										Email Address
									</label>
									<div className="relative">
										<Mail
											className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
												isDarkMode
													? "text-gray-400"
													: "text-gray-500"
											}`}
										/>
										<input
											type="text"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											className={`w-full pl-10 pr-3 py-2 rounded-lg ${
												isDarkMode
													? "bg-gray-700 text-white border-gray-600 focus:border-blue-400"
													: "bg-white text-gray-900 border-gray-300 focus:border-blue-600"
											} border focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
												errors.email
													? "border-red-500"
													: ""
											}`}
											placeholder="admin@gmail.com"
											required
										/>
									</div>
									{errors.email && (
										<p className="mt-1 text-sm text-red-500 flex items-center">
											<AlertTriangle className="h-4 w-4 mr-1" />
											{errors.email}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="password"
										className={`block text-sm font-medium mb-2 ${
											isDarkMode
												? "text-gray-300"
												: "text-gray-700"
										}`}>
										Password
									</label>
									<div className="relative">
										<Lock
											className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
												isDarkMode
													? "text-gray-400"
													: "text-gray-500"
											}`}
										/>
										<input
											type={
												showPassword
													? "text"
													: "password"
											}
											id="password"
											name="password"
											value={formData.password}
											onChange={handleChange}
											className={`w-full pl-10 pr-12 py-2 rounded-lg ${
												isDarkMode
													? "bg-gray-700 text-white border-gray-600 focus:border-blue-400"
													: "bg-white text-gray-900 border-gray-300 focus:border-blue-600"
											} border focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
												errors.password
													? "border-red-500"
													: ""
											}`}
											placeholder="Enter Password"
											required
										/>
										<button
											type="button"
											onClick={() =>
												setShowPassword(!showPassword)
											}
											className="absolute right-3 top-1/2 -translate-y-1/2">
											{showPassword ? (
												<EyeOff
													className={`h-5 w-5 ${
														isDarkMode
															? "text-gray-400"
															: "text-gray-500"
													}`}
												/>
											) : (
												<Eye
													className={`h-5 w-5 ${
														isDarkMode
															? "text-gray-400"
															: "text-gray-500"
													}`}
												/>
											)}
										</button>
									</div>
									{errors.password && (
										<p className="mt-1 text-sm text-red-500 flex items-center">
											<AlertTriangle className="h-4 w-4 mr-1" />
											{errors.password}
										</p>
									)}
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<input
											type="checkbox"
											id="remember"
											name="remember"
											checked={formData.remember}
											onChange={handleChange}
											className={`h-4 w-4 rounded ${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-blue-400 focus:ring-blue-400"
													: "bg-white border-gray-300 text-blue-600 focus:ring-blue-600"
											} focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
										/>
										<label
											htmlFor="remember"
											className={`ml-2 text-sm ${
												isDarkMode
													? "text-gray-300"
													: "text-gray-700"
											}`}>
											Remember me
										</label>
									</div>
									<Link
										to="/forgot-password?role=admin"
										className={`text-sm font-medium ${
											isDarkMode
												? "text-blue-400 hover:text-blue-300"
												: "text-blue-600 hover:text-blue-700"
										}`}>
										Forgot password?
									</Link>
								</div>

								<button
									type="submit"
									className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
										isDarkMode
											? "bg-blue-600 hover:bg-blue-700"
											: "bg-gradient-to-r from-[#ff6b35] to-[#ff8c35] hover:from-[#ff8c35] hover:to-[#ff6b35]"
									}`}
									disabled={!isFormValid || isLoading}>
									{isLoading ? (
										<Spinner size="small" />
									) : (
										<>
											Sign In
											<ArrowRight className="h-5 w-5" />
										</>
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
