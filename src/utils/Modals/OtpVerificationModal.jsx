/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";

export default function OtpVerificationModal({
	isOpen,
	onClose,
	onVerify,
	onResendOtp,
	isLoading,
}) {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [timer, setTimer] = useState(30);
	const [resendDisabled, setResendDisabled] = useState(true);
	const inputRefs = useRef([]);

	useEffect(() => {
		if (isOpen) {
			 setOtp(["", "", "", "", "", ""]);
			 initializeTimer();
			 inputRefs.current[0]?.focus();
		}
  }, [isOpen]);
  
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(
				() => setTimer((prev) => prev - 1),
				1000
			);
			return () => clearInterval(interval);
		} else {
			setResendDisabled(false);
		}
	}, [timer]);

	const initializeTimer = () => {
		const storedTimestamp = localStorage.getItem("otpTimestamp");
		const currentTime = Date.now();
  
		if (storedTimestamp) {
			 const elapsedSeconds = Math.floor(
				  (currentTime - storedTimestamp) / 1000
			 );
			 const remainingTime = 30 - elapsedSeconds;
  
			 if (remainingTime > 0) {
				  setTimer(remainingTime);
				  setResendDisabled(true);
			 } else {
				  setTimer(0);
				  setResendDisabled(false);
			 }
		} else {
			 startTimer();
		}
  };
  

	const startTimer = () => {
		const startTime = Date.now();
		localStorage.setItem("otpTimestamp", startTime);
		setTimer(30);
		setResendDisabled(true);
	};

	const handleChange = (index, value) => {
		if (/^\d?$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);

			if (value && index < otp.length - 1) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && otp[index] === "" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleVerify = () => {
		const otpString = otp.join("");
		if (otpString.length === 6) {
			onVerify(otpString);
		} else {
			toast.info("Enter a Valid OTP !");
		}
	};

	const handleResendOTP = async () => {
		try {
			startTimer();
			await onResendOtp();
		} catch (error) {
			console.error("Failed to resend OTP:", error);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl p-8 w-full max-w-md relative">
				<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
					Verify Your Account
				</h2>
				<p className="text-gray-600 text-center mb-8">
					We&apos;ve sent a 6-digit code to your email. Enter it below
					to confirm your account.
				</p>
				<div className="flex justify-between mb-8">
					{otp.map((digit, index) => (
						<div key={index} className="w-12 h-12 relative">
							<input
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								maxLength={1}
								value={digit}
								onChange={(e) =>
									handleChange(index, e.target.value)
								}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className="w-full h-full text-center text-xl bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5722]"
							/>
						</div>
					))}
				</div>
				<div className="flex justify-center mb-6">
					<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
						<span className="text-lg font-semibold text-[#ff5722]">
							{timer}
						</span>
					</div>
				</div>
				<div className="flex justify-between items-center mb-6">
					<button
						onClick={() => {
							onClose();
							localStorage.removeItem("otpTimestamp");
						}}
						className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
						Cancel
					</button>
					<button
						onClick={handleVerify}
						className="px-6 py-2 bg-[#ff5722] text-white rounded-lg hover:bg-[#e64a19] transition-colors text-sm font-medium">
						Verify
					</button>
				</div>
				<div className="text-center">
					<button
						onClick={handleResendOTP}
						disabled={resendDisabled}
						className={`text-[#ff5722] text-sm font-medium ${
							resendDisabled && "opacity-50 cursor-not-allowed"
						}`}>
						{isLoading ? <Spinner /> : "Resend OTP"}
					</button>
				</div>
			</div>
		</div>
	);
}
