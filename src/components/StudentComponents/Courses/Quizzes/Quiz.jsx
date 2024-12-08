import React, { useState, useEffect } from "react";
import { ChevronLeft, Clock, AlertCircle } from "lucide-react";
import Button from "@/components/CommonComponents/Button";
import Card from "@/components/CommonComponents/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseQuizByQuizId } from "../../../../store/thunks/courseThunks";
import { axiosInstance } from "../../../../api/axiosConfig";
import { toast } from "sonner";
import ConfirmationModal from "../../../../utils/Modals/ConfirmtionModal";

const Quiz = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const quizData = useSelector((state) => state.courses.courseQuiz);
	const [answers, setAnswers] = useState({});
   const [isModalOpen, setIsModalOpen] = useState(false);
	const [timeLeft, setTimeLeft] = useState(quizData?.time_limit || 10 * 60);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const isDarkMode = useSelector((state) => state.student.toggleTheme);
	const { quiz_id, course_id } = useParams();
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
		   		if (prevTime <= 1) {
					clearInterval(timer);
					setIsSubmitted(true);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleAnswerChange = (questionId, answer) => {
		setAnswers((prev) => ({ ...prev, [questionId]: answer }));
	};
	useEffect(() => {
		const fetchQuiz = async () => {
			await dispatch(fetchCourseQuizByQuizId(quiz_id)).unwrap();
		};
		fetchQuiz();
	}, [quiz_id, dispatch]);

	const handleSubmit = async () => {
		if (Object.entries(answers).length < 10)
			return toast.error("Please answer all the questions");
		try {
			setIsSubmitted(true);
			console.log(answers);
			const response = await axiosInstance.post(
				`/quizzes/submit/${quiz_id}`,
				{ answers }
			);
			if (response.status === 200) {
				navigate(
					`/student/my-courses/${course_id}/quiz/${quiz_id}/result`
				);
				toast.success(response?.data?.message);
			}
		} catch (error) {
			console.log("handle quiz Submit error", error);
		}

		console.log("Submitted answers:", answers);
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

   const handleModalClose = () => {
      setIsModalOpen(false)
   }

   const handleCancelQuiz = () =>{ 
      setIsModalOpen(false)
      navigate(`/student/my-courses/${course_id}`)
   }

	return (
		<div
			className={`min-h-screen ${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-50 text-gray-900"
			}`}>
			<div className={`max-w-3xl mx-auto py-8 px-4`}>
				<Card
					className={`${
						isDarkMode ? "bg-gray-800" : "bg-white"
					} shadow-lg`}>
					{/* Quiz Header */}
					<div
						className={`p-6 border-b ${
							isDarkMode ? "border-gray-700" : "border-gray-200"
						}`}>
						<div className="flex items-center justify-between mb-4">
							<button
								onClick={() => setIsModalOpen(true)}
								className={`p-2 rounded-full ${
									isDarkMode
										? "hover:bg-gray-700"
										: "hover:bg-gray-100"
								}`}>
								<ChevronLeft className="w-5 h-5" />
							</button>
							<div
								className={`flex items-center space-x-2 ${
									timeLeft < 60
										? "text-red-500"
										: isDarkMode
										? "text-gray-300"
										: "text-gray-700"
								}`}>
								<Clock className="w-5 h-5" />
								<span className="font-medium">
									{formatTime(timeLeft)}
								</span>
							</div>
						</div>
						<h1
							className={`text-2xl font-bold ${
								isDarkMode ? "text-gray-100" : "text-gray-800"
							}`}>
							{quizData?.title}
						</h1>
						<p
							className={`mt-2 ${
								isDarkMode ? "text-gray-300" : "text-gray-600"
							}`}>
							{quizData?.description}
						</p>
					</div>

					{/* Quiz Questions */}
					<div className="p-6 space-y-8">
						{quizData?.questions.map((question, index) => (
							<div
								key={question._id}
								className={`p-4 rounded-lg ${
									isDarkMode ? "bg-gray-700" : "bg-gray-50"
								}`}>
								<h2
									className={`text-lg font-semibold mb-4 ${
										isDarkMode
											? "text-gray-200"
											: "text-gray-800"
									}`}>
									{index + 1}. {question.question}
								</h2>
								<div className="space-y-2">
									{question.options.map(
										(option, optionIndex) => (
											<label
												key={optionIndex}
												className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
													isDarkMode
														? answers[
																question._id
														  ] === option
															? "bg-gray-600"
															: "hover:bg-gray-600"
														: answers[
																question._id
														  ] === option
														? "bg-orange-100"
														: "hover:bg-orange-100"
												}`}>
												<input
													type="radio"
													name={`question-${question._id}`}
													value={option}
													checked={
														answers[
															question._id
														] === option
													}
													onChange={() =>
														handleAnswerChange(
															question._id,
															option
														)
													}
													disabled={isSubmitted}
													className="mr-3 form-radio text-orange-500 focus:ring-orange-500"
												/>
												<span
													className={
														isDarkMode
															? "text-gray-200"
															: "text-gray-700"
													}>
													{option}
												</span>
											</label>
										)
									)}
								</div>
							</div>
						))}
					</div>

					{/* Submit Button */}
					<div
						className={`p-6 border-t ${
							isDarkMode ? "border-gray-700" : "border-gray-200"
						}`}>
						<Button
							onClick={handleSubmit}
							disabled={isSubmitted}
							text={
								isSubmitted ? "Quiz Submitted" : "Submit Quiz"
							}
							className={`w-full py-2 text-white font-semibold rounded-lg ${
								isDarkMode
									? "bg-orange-600 hover:bg-orange-700"
									: "bg-orange-500 hover:bg-orange-600"
							}`}
						/>
					</div>

					{/* Results Section */}
					{isSubmitted && (
						<div
							className={`p-6 border-t ${
								isDarkMode
									? "border-gray-700"
									: "border-gray-200"
							}`}>
							<h2
								className={`text-xl font-semibold mb-4 ${
									isDarkMode
										? "text-gray-200"
										: "text-gray-800"
								}`}>
								Quiz Results
							</h2>
							<div
								className={`flex items-start p-4 rounded-lg ${
									isDarkMode ? "bg-gray-700" : "bg-gray-100"
								}`}>
								<AlertCircle
									className={`w-6 h-6 mr-3 flex-shrink-0 ${
										isDarkMode
											? "text-gray-300"
											: "text-gray-600"
									}`}
								/>
								<p
									className={`text-lg ${
										isDarkMode
											? "text-gray-300"
											: "text-gray-700"
									}`}>
									You&apos;ve completed the quiz! Your answers have
									been submitted. Detailed results will be
									available soon.
								</p>
							</div>
						</div>
					)}
				</Card>
			</div>
         {isModalOpen && 
			<ConfirmationModal
				isDarkMode={isDarkMode}
				isOpen={isModalOpen}
				onClose={handleModalClose}
            title={"Cancel Quiz?"}
            description={"Are you sure you want to cancel this quiz? Your progress will not be saved."}
            confirmText={"Yes"}
            cancelText={"No"}
            onConfirm={handleCancelQuiz}
            icon="danger"
			/>}
		</div>
	);
};

export default Quiz;
