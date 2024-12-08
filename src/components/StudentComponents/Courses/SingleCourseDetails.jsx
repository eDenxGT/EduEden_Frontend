import { useState, useEffect } from "react";
import {
	Star,
	Clock,
	Users,
	Globe,
	Play,
	FileText,
	ChevronDown,
	User2Icon,
	CopyIcon,
} from "lucide-react";
import Button from "@/components/CommonComponents/Button";
import Card from "@/components/CommonComponents/Card";
import { fetchCoursesByCourseId } from "../../../store/thunks/courseThunks";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { addToCart } from "../../../store/thunks/cartThunks";

const SingleCourseDetails = () => {
	const navigate = useNavigate();
	const [activeAccordion, setActiveAccordion] = useState(null);
	const [copied, setCopied] = useState(false);
	const { course_id } = useParams();
	const { course } = useSelector((state) => state.courses);
	const { user_id } = useSelector((state) => state.student.studentData);
	const { cart } = useSelector((state) => state.cart);

	const isCourseInCart = cart?.some((item) => item?.course_id === course_id);
	const isAlreadyPurchased = useSelector((state) =>
		state.student.studentData.active_courses?.some(
			(item) => item === course_id
		)
	);

	const dispatch = useDispatch();
	const toggleAccordion = (index) => {
		setActiveAccordion(activeAccordion === index ? null : index);
	};

	const copyLink = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};
	const storedCourseDetails =
		course?.course_id === course_id && course?.lectures ? course : null;

	const fetchCourseData = async () => {
		await dispatch(fetchCoursesByCourseId(course_id)).unwrap();
	};
	useEffect(() => {
		if (!storedCourseDetails) {
			fetchCourseData();
		}
	}, []);

	const handleBuyNow = () => {
		navigate(`/student/checkout/${user_id}`, {
			state: { singlePurchaseCourse: course },
		});
	};

	const handleGoToCourse = async () => {
		navigate(`/student/my-courses/${course?.course_id}`);
	};
	const handleAddToCart = async () => {
		await dispatch(addToCart({ course_id, user_id })).unwrap();
	};
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Navigation link */}
				<RouterLink
					to="/student/courses"
					className=" text-gray-500 hover:text-gray-900 mb-4">
					<span>Courses / </span>
				</RouterLink>
				<span className="text-gray-500 hover:text-gray-700 mb-4">
					{course?.title}
				</span>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Main Content */}
					<div className="flex-1">
						<div className="space-y-6">
							{/* Course Header */}
							<div>
								<h1 className="text-3xl font-bold text-gray-900 mb-4">
									{course?.title}
								</h1>
								<p className="text-gray-600 mb-4">
									{course?.course_description}
								</p>
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2">
										{course?.tutor_avatar ? (
											<img
												className="w-10 h-10 rounded-full border-2 border-white"
												src={course?.tutor_avatar}
												alt="Instructor"
											/>
										) : (
											<User2Icon size={18} />
										)}
										<div>
											<p className="text-sm font-medium">
												Created by
											</p>
											<p className="text-sm text-gray-500">
												{course?.tutor_name}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<div className="flex">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`w-5 h-5  ${
														i <
														course?.average_rating
															? "text-yellow-400"
															: "text-gray-300"
													}`}
													fill="currentColor"
												/>
											))}
										</div>
										<span className="font-semibold">
											{(course?.average_rating)?.toFixed(1)}
										</span>
										<span className="text-gray-500">
											({course?.ratings_count} Ratings)
										</span>
									</div>
								</div>
							</div>

							{/* Course Preview */}
							<div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
								<img
									src={course?.course_thumbnail}
									alt="Course preview"
									className="w-full h-full object-cover"
								/>
								<button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-4">
									<Play className="w-12 h-12 text-orange-600" />
								</button>
							</div>

							{/* Course Description */}
							<div className="prose max-w-none">
								<h2 className="text-xl font-semibold mb-4">
									Description
								</h2>
								<p className="text-gray-600">
									{course?.course_description}
								</p>
							</div>

							{/* Curriculum */}
							<div>
								<h2 className="text-xl font-semibold mb-4">
									Course Content
								</h2>
								<div className="space-y-4">
									{course?.lectures?.map((lecture, index) => (
										<div
											key={index}
											className="border rounded-lg">
											<button
												className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
												onClick={() =>
													toggleAccordion(index)
												}>
												<span className="font-medium text-left">
													{lecture?.title}
												</span>
												<ChevronDown
													className={`w-5 h-5 transition-transform ${
														activeAccordion ===
														index
															? "rotate-180"
															: ""
													}`}
												/>
											</button>
											{activeAccordion === index && (
												<div className="px-4 py-2 border-t">
													<div className="py-2 flex items-center justify-between text-gray-600 hover:bg-gray-50">
														<span>
															Lecture duration :{" "}
															{lecture?.duration}
														</span>
													</div>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:w-[380px]">
						<Card className={` p-6`}>
							<div className="space-y-6">
								<div>
									<div className="flex items-center gap-2 mb-1">
										<span className="text-2xl font-bold">
											₹{course?.price}
										</span>
									</div>
								</div>

								<div className="space-y-4">
									<div className="flex items-center gap-3 text-gray-600">
										<Clock className="w-5 h-5" />
										<div>
											<p className="text-sm text-gray-500">
												Course Duration
											</p>
											<p>{course?.duration}</p>
										</div>
									</div>
									<div className="flex items-center gap-3 text-gray-600">
										<FileText className="w-5 h-5" />
										<div>
											<p className="text-sm text-gray-500">
												Course Level
											</p>
											<p>{course?.level}</p>
										</div>
									</div>
									<div className="flex items-center gap-3 text-gray-600">
										<Users className="w-5 h-5" />
										<div>
											<p className="text-sm text-gray-500">
												Students Enrolled
											</p>
											<p>{course?.enrolled_count}</p>
										</div>
									</div>
									<div className="flex items-center gap-3 text-gray-600">
										<Globe className="w-5 h-5" />
										<div>
											<p className="text-sm text-gray-500">
												Language
											</p>
											<p>{course?.language}</p>
										</div>
									</div>
								</div>

								<div className="space-y-3">
									{isAlreadyPurchased ? (
										<Button
											text="Watch Course"
											className="w-full bg-[#FF5722] font-semibold hover:bg-[#F4511E] text-white py-3"
											onClick={handleGoToCourse}
										/>
									) : isCourseInCart ? (
										<Button
											text="Go To Cart"
											className="w-full bg-[#FF5722] font-semibold hover:bg-[#F4511E] text-white py-3"
											onClick={() =>
												navigate(
													`/student/cart/${user_id}`
												)
											}
										/>
									) : (
										<Button
											text="Add To Cart"
											className="w-full bg-[#FF5722] font-semibold hover:bg-[#F4511E] text-white py-3"
											onClick={handleAddToCart}
										/>
									)}
									{!isAlreadyPurchased && (
										<>
											<Button
												onClick={handleBuyNow}
												text="Buy Now"
												className="w-full bg-orange-100 font-semibold text-orange-500 hover:bg-orange-200 py-3"
											/>
											<button className="w-full text-center text-gray-600 hover:text-gray-800">
												Add To Wishlist
											</button>
											<p className="text-sm text-gray-500 italic">
												Note: all courses have a 30-day
												money-back guarantee
											</p>
										</>
									)}
								</div>

								<div className="space-y-4">
									<h3 className="font-medium">
										This course includes:
									</h3>
									<ul className="space-y-3">
										<li className="flex items-center gap-3 text-gray-600">
											<Clock className="w-5 h-5" />
											<span>Lifetime access</span>
										</li>
										<li className="flex items-center gap-3 text-gray-600">
											<FileText className="w-5 h-5" />
											<span>
												30-days money-back guarantee
											</span>
										</li>
										<li className="flex items-center gap-3 text-gray-600">
											<FileText className="w-5 h-5" />
											<span>
												Free exercises file &
												downloadable resources
											</span>
										</li>
										<li className="flex items-center gap-3 text-gray-600">
											<FileText className="w-5 h-5" />
											<span>
												Shareable certificate of
												completion
											</span>
										</li>
										<li className="flex items-center gap-3 text-gray-600">
											<Globe className="w-5 h-5" />
											<span>
												Access on mobile, tablet and TV
											</span>
										</li>
										<li className="flex items-center gap-3 text-gray-600">
											<Globe className="w-5 h-5" />
											<span>100% online course</span>
										</li>
									</ul>
								</div>

								<div>
									<h3 className="font-medium mb-3">
										Share this course:
									</h3>
									<div className="flex items-center gap-4">
										<button className="text-gray-400 hover:text-gray-600">
											<FaFacebook />
										</button>
										<button className="text-gray-400 hover:text-gray-600">
											<FaTwitter />
										</button>
										<button className="text-gray-400 hover:text-gray-600">
											<FaLinkedinIn />
										</button>
										<div className="relative">
											<button
												className="text-gray-400 hover:text-gray-600 flex items-center"
												onClick={copyLink}>
												<span className="mr-2">
													Copy Link
												</span>
												<CopyIcon className="w-5 h-5" />
											</button>
											{copied && (
												<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-xs rounded py-1 px-2 mb-2">
													Link copied!
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCourseDetails;
