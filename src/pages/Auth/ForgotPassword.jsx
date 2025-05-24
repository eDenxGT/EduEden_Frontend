import { useState } from "react";
import { PiGraduationCap } from "react-icons/pi";
import InputField from "../../components/CommonComponents/InputField";
import Button from "../../components/CommonComponents/Button";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { axiosInstance } from "../../api/axiosConfig";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "../../utils/Spinner/Spinner";
import { toast } from "sonner";
import ForgotPassImage from "../../assets/images/authPage/ForgotPassImage.png";
import { AlertTriangle } from "lucide-react";

const ForgotPassword = () => {
	const [searchParams] = useSearchParams();
	const role = searchParams.get("role") || "student";

	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!email.includes("@") ||
			!email.includes(".") ||
			/[^a-zA-Z0-9@.]/.test(email)
		) {
			setError("Invalid email address");
			return;
		}

		setIsLoading(true);

		try {
			const response = await axiosInstance.post("/auth/forgot-password", {
				email,
				role,
			});
			if (response.status === 200) {
				toast.success(response.data.message);
			}
			console.error("Forgot Password Error:", error);
		} catch (error) {
			console.error("Forgot Password Error:", error);
			const errorMessage =
				error?.response?.data?.message ||
				"An error occurred while resetting the password.";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="flex justify-center items-center p-4 border-b border-gray-200">
				<div className="flex items-center">
					<PiGraduationCap className="h-6 w-6 text-[#ff5722]" />
					<span className="ml-2 text-xl font-semibold">
						<span className="text-gray-900">Edu</span>
						<span className="text-[#ff5722]">Eden</span>
					</span>
				</div>
			</div>

			<div className="min-h-screen flex justify-center items-center">
				<div className="max-w-[50rem] w-full mx-auto bg-white rounded-2xl shadow-lg">
					<div className="lg:flex lg:rounded-2xl">
						<div className="lg:w-1/2 lg:rounded-l-2xl lg:rounded-r-none rounded-t-2xl bg-[#ebebff] flex items-center justify-center">
							<img
								src={ForgotPassImage}
								alt="Illustration"
								className="max-w-[24rem] rounded-2xl"
							/>
						</div>
						<div className="lg:w-1/2 p-8 lg:rounded-r-2xl lg:rounded-l-none rounded-b-2xl">
							<h1 className="text-2xl font-bold text-gray-900 mb-3">
								Forgot Password
							</h1>
							<p className="text-gray-600 mb-8">
								Enter the email address associated with your
								account and we&#39;ll send you a link to reset
								your password.
							</p>

							<form
								className="flex flex-col gap-4"
								onSubmit={handleSubmit}>
								<div className="relative">
									<InputField
										label="Email"
										placeholder="Enter your email address"
										name="email"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
											setError("");
										}}
									/>
									{error && (
										<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem]">
											<AlertTriangle className="h-4 w-4 mr-1" />
											{error}
										</span>
									)}
								</div>

								<Button
									type="submit"
									className="flex items-center justify-center gap-2 shadow-md"
									text={isLoading ? "" : "Reset Password"}
									disabled={isLoading || !email}>
									{isLoading ? (
										<Spinner size="small" />
									) : (
										<FiArrowRight className="w-4 h-4" />
									)}
								</Button>

								<Link
									to={`/${role}/signin`}
									className="mt-5 text-center">
									<span className="flex items-center gap-2 text-[#ff5722] font-medium  hover:underline">
										<FiArrowLeft className="w-4 h-4" />{" "}
										<span>Back to Sign In</span>
									</span>
								</Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
