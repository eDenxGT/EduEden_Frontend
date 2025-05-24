import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
	Download,
	Award,
	FrownIcon,
	ArrowLeft,
	CheckCircle,
	XCircle,
} from "lucide-react";
import Button from "@/components/CommonComponents/Button";
import Card from "@/components/CommonComponents/Card";
import { axiosInstance } from "../../../../api/axiosConfig";
import CertificateDownloader from "../Certificates/CertificateDownloader";

const QuizResult = () => {
	const [passed, setPassed] = useState(false);
	const [courseName, setCourseName] = useState("");
	const [score, setScore] = useState(0);
	const [loading, setLoading] = useState(true);
	const { toggleTheme: isDarkMode, studentData } = useSelector(
		(state) => state.student
	);
	const navigate = useNavigate();
	const { course_id, quiz_id } = useParams();

	const certificateRef = useRef();

	useEffect(() => {
		const fetchQuizResult = async () => {
			try {
				setLoading(true);
				const response = await axiosInstance.get(
					`/quizzes/${course_id}/${quiz_id}/result`
				);
				const scoreNew = response?.data?.courseProgressData?.quiz_marks;
				const calculatedScore = Math.round((scoreNew / 10) * 100);
				setPassed(scoreNew >= 7 ? true : false);
				setScore(calculatedScore);
				setCourseName(response?.data?.courseName);
			} catch (error) {
				console.log("QUIZ RESULT FETCHING ERROR: ", error);
			} finally {
				setLoading(false);
			}
		};
		fetchQuizResult();
	}, [course_id, quiz_id]);

	const handleDownloadCertificate = () => {
		if (passed && certificateRef.current) {
			certificateRef.current.handleDownload(); 
		}
	};

	const handleRedirectToCourses = () => {
		navigate("/student/my-courses");
	};

	return (
		<div
			className={`min-h-screen flex items-center justify-center p-4 ${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-100 text-gray-900"
			}`}>
			<Card
				className={`w-full max-w-md ${
					isDarkMode ? "bg-gray-800" : "bg-white"
				} shadow-xl rounded-lg overflow-hidden`}>
				<AnimatePresence>
					{loading ? (
						<motion.div
							key="loading"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="flex flex-col items-center justify-center h-64">
							<motion.div
								animate={{ rotate: 360 }}
								transition={{
									duration: 1,
									repeat: Infinity,
									ease: "linear",
								}}
								className={`w-16 h-16 border-4 border-t-4 border-orange-500 rounded-full`}
							/>
							<p
								className={`mt-4 ${
									isDarkMode
										? "text-gray-300"
										: "text-gray-600"
								}`}>
								Loading result...
							</p>
						</motion.div>
					) : (
						<motion.div
							key="result"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="p-8">
							<h1
								className={`text-3xl font-bold mb-6 text-center ${
									isDarkMode
										? "text-orange-400"
										: "text-orange-600"
								}`}>
								Quiz Result
							</h1>

							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									type: "spring",
									stiffness: 260,
									damping: 20,
								}}
								className="mb-6 flex flex-col items-center">
								{passed ? (
									<Award className="w-24 h-24 text-orange-500" />
								) : (
									<FrownIcon className="w-24 h-24 text-orange-500" />
								)}
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										delay: 0.3,
										type: "spring",
										stiffness: 260,
										damping: 20,
									}}
									className={`mt-4 text-5xl font-bold ${
										passed
											? "text-green-500"
											: "text-red-500"
									}`}>
									{score}%
								</motion.div>
							</motion.div>

							<h2
								className={`text-2xl font-semibold mb-4 text-center ${
									isDarkMode
										? "text-gray-200"
										: "text-gray-700"
								}`}>
								{passed
									? "Congratulations! You Passed!"
									: "Oops! You Didn't Pass"}
							</h2>
							<p
								className={`mb-6 text-center ${
									isDarkMode
										? "text-gray-300"
										: "text-gray-600"
								}`}>
								{passed
									? "You've successfully completed the quiz. You can now download your certificate of achievement."
									: "Don't worry! You can always review the material and try again."}
							</p>

							<div className="space-y-4">
								{passed && (
									<Button
										onClick={handleDownloadCertificate}
										className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors duration-300">
										<Download className="w-4 h-4 mr-2" />
										Download Certificate
									</Button>
								)}
								<Button
									onClick={handleRedirectToCourses}
									className={`w-full ${
										isDarkMode
											? "bg-gray-600 hover:bg-gray-700"
											: "bg-gray-300 hover:bg-gray-400"
									} flex items-center justify-center text-white transition-colors duration-300`}>
									<ArrowLeft className="w-4 h-4 mr-2" />
									Back to My Courses
								</Button>
							</div>

							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
								className={`mt-6 p-4 rounded-lg ${
									isDarkMode ? "bg-gray-700" : "bg-gray-200"
								}`}>
								<h3
									className={`text-lg font-semibold mb-2 ${
										isDarkMode
											? "text-gray-200"
											: "text-gray-700"
									}`}>
									Quiz Summary
								</h3>
								<ul className="space-y-2">
									<li className="flex items-center">
										<CheckCircle className="w-5 h-5 mr-2 text-green-500" />
										<span>
											Correct Answers:{" "}
											{Math.floor(score / 10)}
										</span>
									</li>
									<li className="flex items-center">
										<XCircle className="w-5 h-5 mr-2 text-red-500" />
										<span>
											Incorrect Answers:{" "}
											{10 - Math.floor(score / 10)}
										</span>
									</li>
								</ul>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</Card>

			<CertificateDownloader
				ref={certificateRef}
				studentName={studentData?.full_name}
				courseName={courseName}
			/>
		</div>
	);
};

export default QuizResult;
