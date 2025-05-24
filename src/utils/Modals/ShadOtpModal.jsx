/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function OTPVerificationModal({
	isOpen,
	onClose,
	fieldToVerify,
	value,
	onReSendOTP,
	onVerifyOTP,
}) {
	const [otp, setOtp] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [timer, setTimer] = useState(30);
	const [resendDisabled, setResendDisabled] = useState(true);
	const [verificationStatus, setVerificationStatus] = useState(null);

	useEffect(() => {
		if (isOpen) {
			setOtp("");
			initializeTimer();
			setVerificationStatus(null);
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

	const handleResendOTP = async () => {
		setIsLoading(true);
		try {
			await onReSendOTP(fieldToVerify, value);
			startTimer();
		} catch (error) {
			toast.error(
				`Failed to send OTP: ${error.message || "Unknown error"}`
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerifyOTP = async () => {
		if (otp.length !== 6) {
			toast.info("Please enter a valid 6-digit OTP");
			return;
		}
		setIsLoading(true);
		try {
			await onVerifyOTP(fieldToVerify, value, otp);

			// setVerificationStatus("success");
		} catch (error) {
			// setVerificationStatus("error");
			toast.error(
				`Verification failed: ${error.message || "Unknown error"}`
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				onClose();
				localStorage.removeItem("otpTimestamp");
			}}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-center">
						Verify Your Account
					</DialogTitle>
					<DialogDescription className="text-center">
						We&apos; ve sent a 6-digit code to your {fieldToVerify}.
						Enter it below to confirm your account.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col items-center justify-center space-y-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						<InputOTP
							maxLength={6}
							value={otp}
							onChange={(value) => setOtp(value)}>
							<InputOTPGroup className="gap-2">
								{[...Array(6)].map((_, index) => (
									<InputOTPSlot
										key={index}
										index={index}
										className="w-12 h-12 text-center text-xl bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5722]"
									/>
								))}
							</InputOTPGroup>
						</InputOTP>
					</motion.div>
					<motion.div
						className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center"
						animate={{
							scale: timer === 0 ? [1, 1.1, 1] : 1,
						}}
						transition={{ duration: 0.5 }}>
						<span className="text-xl font-semibold text-[#ff5722]">
							{timer}
						</span>
					</motion.div>
				</div>
				<DialogFooter className="flex flex-col space-y-4">
					<div className="flex justify-between items-center w-full">
						<Button
							onClick={() => {
								onClose();
								localStorage.removeItem("otpTimestamp");
							}}
							variant="outline"
							className="px-6 py-2 bg-gray-200 text-gray-800 rounded-sm hover:bg-gray-300 transition-colors text-sm font-medium">
							Cancel
						</Button>
						<div className="text-center">
							<Button
								onClick={handleResendOTP}
								disabled={resendDisabled || isLoading}
								variant="link"
								className={`text-[#ff5722] text-sm font-medium ${
									(resendDisabled || isLoading) &&
									"opacity-50 cursor-not-allowed"
								}`}>
								{isLoading ? (
									<Loader2 className="w-4 h-4 animate-spin mr-2" />
								) : (
									"Resend OTP"
								)}
							</Button>
						</div>
						<Button
							onClick={handleVerifyOTP}
							className="px-6 py-2 bg-[#ff5722] text-white rounded-sm hover:bg-[#e64a19] transition-colors text-sm font-medium"
							disabled={otp.length !== 6 || isLoading}>
							{isLoading ? (
								<Loader2 className="w-4 h-4 animate-spin mr-2" />
							) : (
								"Verify"
							)}
						</Button>
					</div>
				</DialogFooter>
				<AnimatePresence>
					{verificationStatus && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
							{verificationStatus === "success" ? (
								<div className="flex flex-col items-center">
									<CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
									<p className="text-lg font-semibold text-green-700">
										Verification Successful!
									</p>
								</div>
							) : (
								<div className="flex flex-col items-center">
									<XCircle className="w-16 h-16 text-red-500 mb-4" />
									<p className="text-lg font-semibold text-red-700">
										Verification Failed
									</p>
								</div>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	);
}
