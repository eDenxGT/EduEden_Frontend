import { useState } from "react";
import { PiGraduationCap } from "react-icons/pi";
import InputField from "../../components/CommonComponents/InputField";
import Button from "../../components/CommonComponents/Button";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { axiosInstance } from "../../api/axiosConfig";
import {
	useNavigate,
	Link,
	useParams,
	useSearchParams,
} from "react-router-dom";
import Spinner from "../../utils/Spinner/Spinner";
import { toast } from "sonner";
import ResetPasswordImage from "../../assets/images/authPage/ResetPassImage.png";

const ResetPassword = () => {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [searchParams] = useSearchParams();
	const username = searchParams.get("name") || "User";
	const role = searchParams.get("role") || "student";
	const navigate = useNavigate();
	const { token } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		if (
			!newPassword ||
			!confirmPassword ||
			newPassword !== confirmPassword
		) {
			return toast.error("Please fix the validation errors.");
		}
		setIsLoading(true);

		try {
			const response = await axiosInstance.post(
				`/auth/reset-password/${token}?role=${role}`,
				{
					newPassword,
					confirmPassword,
				}
			);
			if (response.status === 200) {
				toast.success(response?.data?.message);
				setTimeout(() => {
					navigate(`/${role}/signin`);
				}, 1500);
			}
		} catch (error) {
			const errorMessage =
				error?.response?.data?.message ||
				"An error occurred while resetting the password.";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "newPassword") {
			setNewPassword(value);
			setErrors((prev) => ({
				...prev,
				newPassword:
					value.length < 6 ? "At least 6 characters required" : "",
				confirmPassword:
					confirmPassword && value !== confirmPassword
						? "Passwords do not match"
						: "",
			}));
		} else if (name === "confirmPassword") {
			setConfirmPassword(value);
			setErrors((prev) => ({
				...prev,
				confirmPassword:
					newPassword !== value ? "Passwords do not match" : "",
			}));
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<header className="flex justify-center items-center p-4 border-b border-gray-200">
				<div className="flex items-center">
					<PiGraduationCap className="h-6 w-6 text-[#ff5722]" />
					<span className="ml-2 text-xl font-semibold">
						<span className="text-gray-900">Edu</span>
						<span className="text-[#ff5722]">Eden</span>
					</span>
				</div>
			</header>

			<div className="flex-grow flex items-center justify-center px-4">
				<div className="max-w-[50rem] w-full mx-auto bg-white rounded-2xl shadow-lg">
					<div className="lg:flex lg:rounded-2xl">
						<div className="lg:w-1/2 lg:rounded-l-2xl lg:rounded-r-none rounded-t-2xl bg-[#ebebff] flex items-center justify-center">
							<img
								src={ResetPasswordImage}
								alt="Reset Password Illustration"
								className="max-w-[24rem] rounded-2xl"
							/>
						</div>
						<div className="lg:w-1/2 p-8 lg:rounded-r-2xl lg:rounded-l-none rounded-b-2xl">
							<h1 className="text-2xl font-bold text-gray-900 mb-3">
								{username && (
									<>
										Hi
										<span className="text-[#ff5722]">
											{" "}
											{username}!
										</span>
									</>
								)}
								<br /> Reset Your Password
							</h1>
							<p className="text-gray-600 mb-6 text-sm">
								Choose a strong, unique password to keep your
								account secure.
							</p>
							<form
								className="flex flex-col gap-4"
								onSubmit={handleSubmit}>
								<div className="relative">
									<InputField
										label="New Password"
										type={
											showNewPassword
												? "text"
												: "password"
										}
										placeholder="Enter your new password"
										name="newPassword"
										value={newPassword}
										onChange={handleChange}
										showPassword={showNewPassword}
										setShowPassword={() =>
											setShowNewPassword(!showNewPassword)
										}
									/>
									{errors.newPassword && (
										<span className="text-xs text-red-600 absolute -bottom-4 left-0">
											{errors.newPassword}
										</span>
									)}
								</div>
								<div className="relative">
									<InputField
										label="Confirm Password"
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										placeholder="Confirm your new password"
										name="confirmPassword"
										value={confirmPassword}
										onChange={handleChange}
										showPassword={showConfirmPassword}
										setShowPassword={() =>
											setShowConfirmPassword(
												!showConfirmPassword
											)
										}
									/>
									{errors.confirmPassword && (
										<span className="text-xs text-red-600 absolute -bottom-4 left-0">
											{errors.confirmPassword}
										</span>
									)}
								</div>

								<Button
									type="submit"
									className="flex items-center mt-3 justify-center gap-2 shadow-md"
									text={isLoading ? "" : "Reset Password"}
									disabled={
										isLoading ||
										errors.newPassword ||
										errors.confirmPassword ||
										!newPassword ||
										!confirmPassword
									}>
									{isLoading ? (
										<Spinner size="small" />
									) : (
										<FiArrowRight className="w-4 h-4" />
									)}
								</Button>

								<Link
									to={`/${role}/signin`}
									className="mt-4 text-center">
									<span className="flex items-center gap-2 text-[#ff5722] font-medium hover:underline justify-center">
										<FiArrowLeft className="w-4 h-4" />
										<span>Back to Sign In</span>
									</span>
								</Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
