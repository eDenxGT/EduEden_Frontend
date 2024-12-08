import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import {
	ChevronLeft,
	Volume2,
	VolumeX,
	Maximize,
	Minimize,
	Clock,
	FileText,
} from "lucide-react";
import Button from "@/components/CommonComponents/Button";
import { IoSettingsSharp, IoPauseSharp, IoPlaySharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLecturesByCourseId } from "../../../store/thunks/lectureThunks";
import moment from "moment";
import { FaCircleCheck } from "react-icons/fa6";
import {
	fetchCourseProgressByStudentId,
	updateCourseProgressByStudentId,
} from "../../../store/thunks/courseThunks";
import { toast } from "sonner";
import LoadingUi from "../../../utils/Modals/LoadingUiWithText";
import ReviewModal from "./ReviewModal";
import { axiosInstance } from "../../../api/axiosConfig";

const CoursePlayer = () => {
	const playerRef = useRef(null);
	const [playerState, setPlayerState] = useState({
		playing: false,
		volume: 0.7,
		muted: false,
		played: 0,
		playedSeconds: 0,
		duration: 0,
		fullscreen: false,
		playbackRate: 1,
		quality: "auto",
	});

	const [activeTab, setActiveTab] = useState("description");
	const [showControls, setShowControls] = useState(false);
	const [isLoadingUi, setIsLoadingUi] = useState(false);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const [currentLecture, setCurrentLecture] = useState(null);
	const [showSettings, setShowSettings] = useState(false);
	const { toggleTheme: isDarkMode, studentData } = useSelector(
		(state) => state.student
	);
	const [loadingText, setLoadingText] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { course_id, lecture_id } = useParams();
	const { lectures } = useSelector((state) => state.lectures);
	const { courseProgress } = useSelector((state) => state.courses);
	const completedLectures =
		courseProgress?.progress?.filter(
			(lecture) => lecture?.status === "completed"
		).length || 0;
	const totalLectures = courseProgress?.progress?.length || 0;
	console.log(completedLectures);
	const currentProgress = Math.floor(
		(completedLectures / totalLectures) * 100
	);

	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.key === "f" || e.key === "F") {
				handleFullscreen();
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	useEffect(() => {
		const fetchLectures = async () => {
			await dispatch(
				fetchLecturesByCourseId({
					course_id,
					student_id: studentData?.user_id,
				})
			).unwrap();
		};
		fetchLectures();
	}, [dispatch, course_id, studentData]);

	useEffect(() => {
		const fetchCourseProgress = async () => {
			await dispatch(
				fetchCourseProgressByStudentId({
					course_id,
					student_id: studentData?.user_id,
				})
			).unwrap();
		};
		fetchCourseProgress();
	}, []);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	const handlePlayPause = () => {
		setPlayerState((prev) => ({ ...prev, playing: !prev.playing }));
	};

	const handleProgress = (state) => {
		setPlayerState((prev) => ({
			...prev,
			played: state.played,
			playedSeconds: state.playedSeconds,
		}));
		console.log(playerState);
		if (
			state.played > 0.9 &&
			state.playedSeconds >= playerState.duration - 0.1
		) {
			handleVideoComplete();
		}
	};

	const handleSeek = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const seekTo = parseFloat(e.target.value);
		setPlayerState((prev) => ({ ...prev, played: seekTo }));
	};

	const handleVolumeChange = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const volumeValue = parseFloat(e.target.value);
		setPlayerState((prev) => ({
			...prev,
			volume: volumeValue,
			muted: volumeValue === 0,
		}));
	};

	const handleMute = () => {
		setPlayerState((prev) => ({ ...prev, muted: !prev.muted }));
	};

	const handleFullscreen = () => {
		if (!document.fullscreenElement) {
			playerRef.current?.wrapper?.requestFullscreen();
			setPlayerState((prev) => ({ ...prev, fullscreen: true }));
		} else {
			document.exitFullscreen();
			setPlayerState((prev) => ({ ...prev, fullscreen: false }));
		}
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleDuration = (duration) => {
		setPlayerState((prev) => ({ ...prev, duration }));
	};

	const handlePlaybackRateChange = (rate) => {
		setPlayerState((prev) => ({ ...prev, playbackRate: rate }));
	};

	const handleQualityChange = (quality) => {
		setPlayerState((prev) => ({ ...prev, quality }));
	};

	const handleVideoClick = (e) => {
		if (e.target.closest(".video-controls")) return;
		handlePlayPause();
	};

	useEffect(() => {
		if (playerRef.current) {
			playerRef.current.seekTo(playerState.played);
		}
	}, [playerState.played]);

	const tutor_name = lectures?.find((item) => item?.tutor_name)?.tutor_name;
	const tutor_avatar = lectures?.find(
		(item) => item?.tutor_avatar
	)?.tutor_avatar;

	const handleDownload = (url) => {
		window.location.href = url;
	};

	const handleVideoComplete = async () => {
		console.log("VIDEO COMPLETED");
		setPlayerState((prev) => ({ ...prev, playing: false }));

		try {
			setIsLoadingUi(true);
			const response = await dispatch(
				updateCourseProgressByStudentId({
					course_id,
					student_id: studentData?.user_id,
					lecture_id: currentLecture?.lecture_id,
					status: "completed",
				})
			).unwrap();
			if (response?.quiz) {
				toast.success(
					"Course completed! Complete the Quiz to Earn certificate."
				);
				navigate(
					`/student/my-courses/${course_id}/quiz/${response.quiz._id}`
				);
			} else {
				toast.success("Lecture progress updated successfully.");
			}

			dispatch(
				fetchCourseProgressByStudentId({
					course_id,
					student_id: studentData?.user_id,
				})
			);
		} catch (error) {
			console.error("Failed to update progress:", error);
		} finally {
			setIsLoadingUi(false);
		}
	};

	const handleReviewSubmit = async (rating) => {
		try {
			setLoadingText("Review Submitting");
			setIsReviewModalOpen(false);
			setIsLoadingUi(true);
			const response = await axiosInstance.put("/courses/review", {
				course_id,
				student_id: studentData?.user_id,
				rating,
			});
			if(response?.status === 200){
				toast.success(response?.data?.message);
			}
		} catch (error) {
			console.log("Review submitting error: ", error);
			toast.error(error?.response?.data?.message);
		} finally {
			setIsLoadingUi(false);
			setLoadingText(null);
		}
	};

	const handleReviewCancel = async () => {
		setIsReviewModalOpen(false);
	};

	const handleLectureClick = (lecture, index) => {
		if (index <= completedLectures) return setCurrentLecture(lecture);
		toast.info("Please complete previous lectures first");
	};

	useEffect(() => {
		setCurrentLecture(
			lectures?.find((lecture, index) => index === completedLectures)
		);
	}, [completedLectures]);

	return (
		<>
			<div
				className={`flex flex-col min-h-screen ${
					isDarkMode
						? "bg-gray-900 text-white"
						: "bg-gray-50 text-gray-900"
				}`}>
				{/* Top Navigation */}
				<div
					className={`flex items-center justify-between px-2 py-2 border-b ${
						isDarkMode ? "border-gray-700" : "border-gray-200"
					}`}>
					<div className="flex items-center space-x-4">
						<button
							onClick={handleGoBack}
							className={`p-1 hover:bg-gray-200 ${
								isDarkMode
									? "bg-gray-800 hover:bg-gray-700"
									: "bg-gray-100"
							} rounded-full`}>
							<ChevronLeft className="w-5 h-5" />
						</button>
						<h1
							className={`text-sm ${
								isDarkMode ? "text-gray-300" : "text-gray-700"
							} max-w-xl truncate`}>
							{currentLecture?.title || ""}
						</h1>
					</div>
					<div className="flex items-center space-x-4">
						<Button
							onClick={() => setIsReviewModalOpen(true)}
							text="Rate this course"
							className="bg-orange-100 border border-orange-200 text-orange-500 mr-2 hover:bg-orange-200"
						/>
					</div>
				</div>

				{/* Main Content */}
				<div className="flex flex-col md:flex-row flex-1">
					{/* Video and Content Section */}
					<div className="flex-1 flex flex-col">
						{/* Video Player */}
						<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
							<div
								className="relative bg-black aspect-video"
								onDoubleClick={handleFullscreen}
								onClick={handleVideoClick}
								onMouseEnter={() => setShowControls(true)}
								onMouseLeave={() => setShowControls(false)}>
								<ReactPlayer
									ref={playerRef}
									url={currentLecture?.video}
									width="100%"
									height="100%"
									playing={playerState.playing}
									volume={playerState.volume}
									muted={playerState.muted}
									onProgress={handleProgress}
									onDuration={handleDuration}
									playbackRate={playerState.playbackRate}
									controls={false}
								/>

								{/* Video Controls */}
								<div
									className={`video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
										showControls
											? "opacity-100"
											: "opacity-0"
									}`}>
									<div className="flex flex-col space-y-2">
										{/* Progress Bar with Custom Styling */}
										<div className="w-full relative h-1 hover:h-2 transition-all duration-300 bg-gray-400 rounded-none group">
											<input
												type="range"
												min={0}
												max={1}
												step="any"
												value={playerState.played}
												onChange={handleSeek}
												onMouseDown={(e) =>
													e.stopPropagation()
												}
												className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
											/>
											<div
												className="absolute left-0 top-0 h-full bg-orange-500 rounded-none"
												style={{
													width: `${
														playerState.played * 100
													}%`,
												}}>
												<div
													className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-600 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
													style={{
														transform:
															"translate(50%, -50%)",
													}}
												/>
											</div>
										</div>

										{/* Controls */}
										<div className="flex items-center justify-between text-white">
											<div className="flex items-center space-x-4">
												<button
													onMouseDown={(e) => {
														e.stopPropagation();
														handlePlayPause();
													}}
													className="focus:outline-none">
													{playerState.playing ? (
														<IoPauseSharp className="w-6 h-6" />
													) : (
														<IoPlaySharp className="w-6 h-6" />
													)}
												</button>
												<span className="text-sm">
													{formatTime(
														playerState.playedSeconds
													)}{" "}
													/{" "}
													{formatTime(
														playerState.duration
													)}
												</span>
											</div>
											<div className="flex items-center space-x-4">
												<div className="flex items-center space-x-2 ml-auto">
													<button
														onClick={handleMute}
														className="focus:outline-none">
														{playerState.muted ? (
															<VolumeX className="w-6 h-6" />
														) : (
															<Volume2 className="w-6 h-6" />
														)}
													</button>
													<div className="relative w-24 h-1 hover:h-2 transition-all duration-300 bg-gray-400 rounded-none group">
														<input
															type="range"
															min="0"
															max="1"
															step="0.1"
															value={
																playerState.volume
															}
															onChange={
																handleVolumeChange
															}
															onMouseDown={(e) =>
																e.stopPropagation()
															}
															className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
														/>
														<div
															className="absolute left-0 top-0 h-full bg-orange-500 rounded-none"
															style={{
																width: `${
																	playerState.volume *
																	100
																}%`,
															}}>
															<div
																className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-600 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
																style={{
																	transform:
																		"translate(50%, -50%)",
																}}
															/>
														</div>
													</div>
												</div>
												<div className="relative group">
													<button
														className="focus:outline-none transform transition-transform duration-300 ease-in-out"
														style={{
															transform:
																showSettings
																	? "rotate(90deg)"
																	: "rotate(0deg)",
														}}
														onClick={() =>
															setShowSettings(
																!showSettings
															)
														}>
														<IoSettingsSharp className="w-6 h-6" />
													</button>
													{showSettings && (
														<div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-md shadow-lg p-4 w-56">
															<div className="text-sm text-white space-y-4">
																<div>
																	<span className="font-medium mb-2 block">
																		Playback
																		Speed
																	</span>
																	<div className="grid grid-cols-3 gap-2">
																		{[
																			0.5,
																			0.75,
																			1,
																			1.25,
																			1.5,
																			2,
																		].map(
																			(
																				rate
																			) => (
																				<button
																					key={
																						rate
																					}
																					onClick={() =>
																						handlePlaybackRateChange(
																							rate
																						)
																					}
																					className={`px-2 py-1 rounded ${
																						playerState.playbackRate ===
																						rate
																							? "bg-orange-500"
																							: "bg-gray-700 hover:bg-gray-600"
																					}`}>
																					{
																						rate
																					}

																					x
																				</button>
																			)
																		)}
																	</div>
																</div>
																<div>
																	<span className="font-medium mb-2 block">
																		Quality
																	</span>
																	<select
																		value={
																			playerState.quality
																		}
																		onChange={(
																			e
																		) =>
																			handleQualityChange(
																				e
																					.target
																					.value
																			)
																		}
																		className="w-full bg-gray-700 rounded p-2">
																		{[
																			"auto",
																			"No other options available",
																		].map(
																			(
																				quality
																			) => (
																				<option
																					key={
																						quality
																					}
																					value={
																						quality
																					}>
																					{
																						quality
																					}
																				</option>
																			)
																		)}
																	</select>
																</div>
															</div>
														</div>
													)}
												</div>
												<button
													onClick={handleFullscreen}
													className="full-screen-toggler focus:outline-none">
													{playerState.fullscreen ? (
														<Minimize className="w-6 h-6" />
													) : (
														<Maximize className="w-6 h-6" />
													)}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Content Section (moved from bottom) */}
						<div className="max-w-4xl mx-auto w-full p-6">
							<div className="mb-6">
								<h1 className="text-2xl font-bold mb-4">
									{currentLecture?.title ?? "Course Finished"}
								</h1>

								<div className="flex flex-wrap items-center gap-6 mb-4">
									<div className="flex items-center">
										<div className="flex -space-x-2">
											<img
												src={tutor_avatar}
												alt="Tutor"
												className="w-8 h-8 object-cover object-center rounded-full border-2 border-white"
											/>
										</div>
										<div className="ml-3">
											<span
												className={`text-gray-500 text-sm ml-1 ${
													isDarkMode
														? "text-gray-400"
														: ""
												}`}>
												{tutor_name}
											</span>
										</div>
									</div>

									<div
										className={`flex items-center text-xs ${
											isDarkMode
												? "text-gray-400"
												: "text-gray-500"
										}`}>
										<Clock className="w-3 h-3 mr-1" />
										<span>
											Last updated:{" "}
											{moment(
												currentLecture?.updated_at
											).format("MMM DD, YYYY")}
										</span>
									</div>
								</div>

								<div
									className={`border-b ${
										isDarkMode
											? "border-gray-700"
											: "border-gray-200"
									}`}>
									<nav className="flex gap-8">
										<button
											className={`py-3 px-1 relative ${
												activeTab === "description"
													? "text-orange-500 border-b-2 border-orange-500"
													: isDarkMode
													? "text-gray-400 hover:text-gray-300"
													: "text-gray-500 hover:text-gray-700"
											}`}
											onClick={() =>
												setActiveTab("description")
											}>
											Description
										</button>
										<button
											className={`py-3 px-1 relative flex items-center gap-2 ${
												activeTab === "attachFile"
													? "text-orange-500 border-b-2 border-orange-500"
													: isDarkMode
													? "text-gray-400 hover:text-gray-300"
													: "text-gray-500 hover:text-gray-700"
											}`}
											onClick={() =>
												setActiveTab("attachFile")
											}>
											Lecture Notes
										</button>
									</nav>
								</div>
							</div>

							<div className="mt-6">
								{activeTab === "description" && (
									<div className="space-y-4">
										<h2
											className={`text-lg font-semibold ${
												isDarkMode
													? "text-gray-200"
													: "text-gray-800"
											}`}>
											Lecture Description
										</h2>
										<p
											className={
												isDarkMode
													? "text-gray-300"
													: "text-gray-600"
											}>
											{currentLecture?.description}
										</p>
									</div>
								)}

								{activeTab === "attachFile" && (
									<>
										<h2
											className={`text-lg font-semibold mb-4 ${
												isDarkMode
													? "text-gray-200"
													: "text-gray-800"
											}`}>
											Attached Files
										</h2>
										<div
											className={`border rounded-none ${
												isDarkMode
													? "bg-gray-800 border-gray-700"
													: "bg-gray-100 border-gray-200"
											} p-4 flex items-center justify-between`}>
											<div className="flex items-center gap-3">
												<FileText className="w-6 h-6 text-orange-500" />
												<div>
													<p
														className={`font-sm ${
															isDarkMode
																? "text-gray-200"
																: "text-gray-800"
														}`}>
														{currentLecture?.title}
														{" - "}lecture notes
													</p>
													{/* <p
													className={`text-sm ${
														isDarkMode
															? "text-gray-400"
															: "text-gray-500"
													}`}>
													12.8 MB
												</p> */}
												</div>
											</div>
											<button
												onClick={() =>
													handleDownload(
														currentLecture?.lecture_note
													)
												}
												className="bg-orange-500 text-white px-4 py-2 text-semibold  hover:bg-orange-600">
												Download File
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>

					{/* Lectures Sidebar */}
					<div
						className={`w-full md:w-96 border-t md:border-t-0 md:border-l overflow-y-auto ${
							isDarkMode ? "border-gray-700" : "border-gray-200"
						}`}>
						<div
							className={`p-4 border-b ${
								isDarkMode
									? "border-gray-700"
									: "border-gray-200"
							}`}>
							<div className="flex justify-between items-center mb-2">
								<h2
									className={`text-lg font-medium ${
										isDarkMode
											? "text-gray-200"
											: "text-gray-800"
									}`}>
									Course Lectures{" "}
									<span
										className={`text-sm ${
											isDarkMode
												? "text-gray-400"
												: "text-gray-500"
										}`}>
										({lectures?.length - 2})
									</span>
								</h2>
							</div>
							<div
								className={`w-full ${
									isDarkMode ? "bg-gray-700" : "bg-gray-200"
								} rounded-none h-2`}>
								<div
									className="bg-orange-500 h-2 rounded-none"
									style={{
										width: `${currentProgress + "%"}`,
									}}></div>
							</div>
							<div
								className={`text-sm ${
									isDarkMode
										? "text-gray-400"
										: "text-gray-500"
								} mt-1`}>
								{currentProgress}% Completed
							</div>
						</div>

						<div className="overflow-auto h-[calc(100vh-12rem)]">
							{lectures?.slice(0, -2)?.map((lecture, index) => (
								<div
									onClick={() =>
										handleLectureClick(lecture, index)
									}
									key={index}
									className={`flex items-center p-3 border-b ${
										lecture.lecture_id ===
										currentLecture?.lecture_id
											? isDarkMode
												? "bg-orange-900 hover:bg-orange-700"
												: "bg-orange-100 hover:bg-orange-200"
											: ""
									} hover:bg-opacity-80 ${
										isDarkMode
											? "border-gray-700 hover:bg-gray-800"
											: "border-gray-200 hover:bg-gray-100"
									}`}>
									<img
										src={lecture?.video_thumbnail}
										alt={lecture?.title}
										className="w-20 h-[45px] object-cover mr-4"
									/>
									<div className="flex-1">
										<span
											className={`text-sm font-medium ${
												isDarkMode
													? "text-gray-200"
													: "text-gray-800"
											}`}>
											{lecture?.title}
										</span>
										<div
											className={`text-xs justify-start flex items-center gap-1 ${
												isDarkMode
													? "text-gray-400"
													: "text-gray-500"
											} mt-1`}>
											<Clock size={10} />
											{lecture?.duration}
										</div>
									</div>
									{courseProgress?.progress?.find(
										(item) =>
											item?.lecture_id ===
												lecture?.lecture_id &&
											item?.status === "completed"
									) && (
										<FaCircleCheck className="w-5 h-5 text-orange-500 ml-2" />
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{isReviewModalOpen && (
				<ReviewModal
					isOpen={isReviewModalOpen}
					onSubmit={(rating) => handleReviewSubmit(rating)}
					onClose={handleReviewCancel}
					isDarkMode={isDarkMode}
				/>
			)}
			{isLoadingUi && (
				<LoadingUi
					text={
						loadingText ??
						(completedLectures === lectures?.length - 3 ||
						completedLectures === lectures?.length - 2
							? "Generating Quiz..."
							: "Next Lecture Loading...")
					}
				/>
			)}
		</>
	);
};

export default CoursePlayer;
