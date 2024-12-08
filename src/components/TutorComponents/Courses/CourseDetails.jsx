import { useEffect } from "react";
import {
	Clock,
	Users,
	FileText,
	Globe,
	Star,
	MoreVertical,
	Calendar,
	BookOpen,
	Clock3,
} from "lucide-react";
import Card from "../../../components/CommonComponents/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchCoursesByCourseId } from "../../../store/thunks/courseThunks";
import moment from "moment";
import LoadingUi from "../../../utils/Modals/LoadingUiWithText";
import { useLoading } from "../../../contexts/LoadingContext";

const CourseDetails = () => {
	const dispatch = useDispatch();
  const navigate = useNavigate()
	const isDarkMode = useSelector((state) => state.tutor.toggleTheme);
	const { course } = useSelector((state) => state.courses);
	const { course_id } = useParams();
	console.log("Courses state:", course);
	const { startLoading, stopLoading, loading } = useLoading();

	const storedCourseDetails =
		course?.course_id === course_id && course?.lectures ? course : null;

	useEffect(() => {
		startLoading();
		const fetchCourseData = async () => {
			if (!storedCourseDetails) {
				await dispatch(fetchCoursesByCourseId(course_id)).unwrap();
			}
		};

		fetchCourseData();
		stopLoading();
	}, []);

	if (loading) {
		return <LoadingUi text={"Course Details Loading"} />;
	}

	if (!storedCourseDetails) {
		return <LoadingUi text={"Course Details Loading"} />;
	}

	const courseData = storedCourseDetails;

	const price = courseData?.price;

	return (
		<div
			className={`min-h-screen ${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-50 text-gray-900"
			}`}>
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<nav className="text-sm mb-6">
					<ol className="flex items-center space-x-2">
						<Link to={"/tutor/my-courses"}>
							<span>My Courses</span>
						</Link>
						<span className="text-gray-500">/</span>
						<Link to={`/tutor/my-courses/${courseData?.course_id}`}>
							<span>{courseData?.title}</span>
						</Link>
					</ol>
				</nav>

				{/* Main Content */}
				<Card
					className={`rounded-none ${
						isDarkMode ? "bg-gray-800" : "bg-white"
					} p-6 mb-8`}>
					<div className="flex flex-col md:flex-row gap-8">
						<div className="md:w-1/3">
							<img
								src={courseData?.course_thumbnail}
								alt={courseData?.title}
								className="w-full rounded-none"
							/>
						</div>
						<div className="md:w-2/3">
							<div className="flex justify-between items-start">
								<div>
									<p className="text-sm text-gray-500">
										Uploaded:{" "}
										{moment(courseData?.created_at).format(
											"MMM DD, YYYY"
										)}{" "}
										• Last Updated:{" "}
										{moment(courseData?.updated_at).format(
											"MMM DD, YYYY"
										)}
									</p>
									<h1 className="text-2xl font-bold mt-2 mb-4">
										{courseData?.title}
									</h1>
									<p className="text-gray-500 mb-4">
										{courseData?.course_description}
									</p>

									<div className="flex items-center gap-4 mb-6">
										<img
											src={courseData?.tutor_avatar}
											alt={courseData?.tutor_name}
											className="w-10 h-10 rounded-full border-2 border-white"
										/>
										<div>
											<p className="text-sm font-medium">
												Created by:
											</p>
											<p className="text-sm text-gray-500">
												{courseData?.tutor_name}
											</p>
										</div>
									</div>
								</div>
								<button>
									<MoreVertical className="w-6 h-6 text-gray-400" />
								</button>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="flex items-center">
										<Star
											size={18}
											color={"#FF5722"}
											className="text-orange-500"
										/>
									</div>
									<span className="font-bold">
										{courseData?.average_rating || 0}
									</span>
									<span className="text-gray-500">
										({courseData?.ratings_count || 0}{" "}
										Ratings)
									</span>
								</div>
								<div className="flex items-center gap-4">
									<div>
										<p className="text-sm text-gray-500">
											Course price
										</p>
										<p className="text-xl font-bold">
											${price.toFixed(2)}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">
											Total revenue
										</p>
										<p className="text-xl font-bold">
											$
											{(
												courseData?.enrolled_count *
												price
											).toFixed(2)}
										</p>
									</div>
									<button className="px-4 py-2 bg-orange-500 text-white rounded-none hover:bg-orange-600">
										Withdraw Money
									</button>
								</div>
							</div>
						</div>
					</div>
				</Card>

				{/* Stats Grid - Updated Design */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{/* Lecture Card */}
					<div
						className={`p-6 border rounded-xl ${
							isDarkMode
								? "bg-gray-800 border-gray-700"
								: "bg-white border-gray-200"
						}`}>
						<div className="flex items-start gap-4">
							<div
								className={`p-3 ${
									isDarkMode ? "bg-red-900" : "bg-red-50"
								} rounded-xl`}>
								<BookOpen className="w-6 h-6 text-red-500" />
							</div>
							<div>
								<h3 className="text-xl font-bold">
									{courseData?.lectures?.length}
								</h3>
								<div className="flex items-center gap-1">
									<p className="text-sm text-gray-500">
										Lectures
									</p>
									{/* <span className="text-xs text-gray-400">()</span> */}
								</div>
							</div>
						</div>
					</div>

					{/* Comments Card */}
					<div
						className={`p-6 border rounded-xl ${
							isDarkMode
								? "bg-gray-800 border-gray-700"
								: "bg-white border-gray-200"
						}`}>
						<div className="flex items-start gap-4">
							<div
								className={`p-3 ${
									isDarkMode ? "bg-blue-900" : "bg-blue-50"
								} rounded-xl`}>
								<Star className="w-6 h-6 text-blue-500" />
							</div>
							<div>
								<h3 className="text-xl font-bold">
									{courseData?.ratings_count || "0"}
								</h3>
								<p className="text-sm text-gray-500">
									Total Ratings
								</p>
							</div>
						</div>
					</div>

					{/* Students Enrolled Card */}
					<div
						className={`p-6 border rounded-xl ${
							isDarkMode
								? "bg-gray-800 border-gray-700"
								: "bg-white border-gray-200"
						}`}>
						<div className="flex items-start gap-4">
							<div
								className={`p-3 ${
									isDarkMode ? "bg-red-900" : "bg-red-50"
								} rounded-xl`}>
								<Users className="w-6 h-6 text-red-500" />
							</div>
							<div>
								<h3 className="text-xl font-bold">
									{courseData?.enrolled_count}
								</h3>
								<p className="text-sm text-gray-500">
									Students enrolled
								</p>
							</div>
						</div>
					</div>

					{/* Course Level Card */}
					<div
						className={`p-6 border rounded-xl ${
							isDarkMode
								? "bg-gray-800 border-gray-700"
								: "bg-white border-gray-200"
						}`}>
						<div className="flex items-start gap-4">
							<div
								className={`p-3 ${
									isDarkMode ? "bg-green-900" : "bg-green-50"
								} rounded-xl`}>
								<FileText className="w-6 h-6 text-green-500" />
							</div>
							<div>
								<h3 className="text-xl font-bold">
									{courseData?.level}
								</h3>
								<p className="text-sm text-gray-500">
									Course level
								</p>
							</div>
						</div>
					</div>

					{/* Course Language Card */}
					<div
						className={`p-6 border rounded-xl ${
							isDarkMode
								? "bg-gray-800 border-gray-700"
								: "bg-white border-gray-200"
						}`}>
						<div className="flex items-start gap-4">
							<div
								className={`p-3 ${
									isDarkMode ? "bg-gray-700" : "bg-gray-100"
								} rounded-xl`}>
								<Globe className="w-6 h-6 text-gray-500" />
							</div>
							<div>
								<h3 className="text-xl font-bold">
									{courseData?.language}
								</h3>
								<p className="text-sm text-gray-500">
									Course Language
								</p>
							</div>
						</div>
					</div>

					{/* Attach File Card */}
					{/* <div className={`p-6 border rounded-xl ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 ${isDarkMode ? 'bg-orange-900' : 'bg-orange-50'} rounded-xl`}>
                <FileBox className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{courseData.attachments_count || '142'}</h3>
                <div className="flex items-center gap-1">
                  <p className="text-sm text-gray-500">Attach File</p>
                  <span className="text-xs text-gray-400">({courseData.attachments_size || '14.4 GB'})</span>
                </div>
              </div>
            </div>
          </div> */}

					{/* Hours Card */}
					<div
						className={`p-6 border rounded-xl ${
							isDarkMode
								? "bg-gray-800 border-gray-700"
								: "bg-white border-gray-200"
						}`}>
						<div className="flex items-start gap-4">
							<div
								className={`p-3 ${
									isDarkMode
										? "bg-purple-900"
										: "bg-purple-50"
								} rounded-xl`}>
								<Clock3 className="w-6 h-6 text-purple-500" />
							</div>
							<div>
								<h3 className="text-xl font-bold">
									{courseData.duration || "19:37:51"}
								</h3>
								<p className="text-sm text-gray-500">
									Course Duration
								</p>
							</div>
						</div>
					</div>

					{/* Students Viewed Card */}
					{/* <div className={`p-6 border rounded-xl ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 ${isDarkMode ? 'bg-amber-900' : 'bg-amber-50'} rounded-xl`}>
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{courseData.views_count || '76,395,167'}</h3>
                <p className="text-sm text-gray-500">Students viewed</p>
              </div>
            </div>
          </div> */}
				</div>

				{/* Lessons Preview - Updated Design */}
				<div className="max-w-7xl mx-auto space-y-6">
					{courseData?.lectures &&
						courseData?.lectures.map((lesson, index) => (
							<div
								key={index}
								className={`flex flex-col md:flex-row overflow-hidden rounded-none border ${
									isDarkMode
										? "bg-gray-800 border-gray-700"
										: "bg-white border-gray-200"
								} shadow-sm`}>
								<div className="md:w-1/4 relative bg-[#FFD700]">
									<img
										src={lesson.video_thumbnail}
										alt={lesson.title}
										className="w-full h-full object- aspect-[4/3]"
									/>
								</div>

								<div className="flex-1 p-6">
									<h3
										className={`text-2xl font-bold mb-4 ${
											isDarkMode
												? "text-white"
												: "text-gray-900"
										}`}>
										{lesson.title}
									</h3>

									<div className="flex flex-wrap gap-6 mb-4">
										<div className="flex items-center gap-2">
											<Calendar className="w-5 h-5 text-gray-500" />
											<span
												className={`${
													isDarkMode
														? "text-gray-300"
														: "text-gray-600"
												}`}>
												Date:{" "}
												{moment(
													lesson?.created_at
												).format("MMM DD, YYYY")}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Clock className="w-5 h-5 text-gray-500" />
											<span
												className={`${
													isDarkMode
														? "text-gray-300"
														: "text-gray-600"
												}`}>
												Duration: {lesson.duration}
											</span>
										</div>
									</div>

									<button
										onClick={() =>
											navigate(
                        `/tutor/my-courses/${courseData.course_id}/lectures/${lesson?.lecture_id}`)
										}
										className="bg-[#FF5A1F] hover:bg-[
#FF4500] text-white px-6 py-2 rounded-none font-semibold transition-colors">
										View Lecture
									</button>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default CourseDetails;
