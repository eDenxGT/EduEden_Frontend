import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@/components/CommonComponents/Card";
import RazorpayButton from "../../../Services/Payment";
import LoadingUi from "../../../utils/Modals/LoadingUiWithText";

const Checkout = () => {
	const { cart } = useSelector((state) => state.cart);
	const [courses, setCourses] = useState([]);
	const { student_id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [isSinglePurchase, setIsSinglePurchase] = useState(false);

	useEffect(() => {
		console.log("FETCHIGN CHCEKOUT");
		if (location.state?.singlePurchaseCourse) {
			setCourses([location.state.singlePurchaseCourse]);
			setIsSinglePurchase(true);
		} else {
			setCourses(cart);
		}
	}, [location.state, cart?.length]);

	const handlePaymentSuccess = () => {
		if (isSinglePurchase) {
			navigate(`/student/my-courses/${courses[0]?.course_id}`);
		} else {
			if (courses?.length > 1) {
				navigate(`/student/my-courses`);
			} else if (courses?.length === 1) {
				navigate(`/student/my-courses/${courses[0]?.course_id}`);
			}
		}
	};

	const subtotal =
		courses?.reduce((acc, course) => acc + course?.price, 0) || 0;
	const eduEdenFee = subtotal * 0.05 || 0;
	const total = subtotal + eduEdenFee;

	return (
		<div className="min-h-screen bg-gray-100 py-8">
			<div className="container mx-auto px-4">
				<div className="mb-8">
					<nav className="text-sm">
						<ol className="flex items-center space-x-2">
							<li>
								<Link
									to="/student/courses"
									className="text-gray-500 hover:text-gray-700">
									Courses
								</Link>
							</li>
							{isSinglePurchase ? (
								<li>
									<span className="text-gray-400 mx-2">
										/
									</span>
									<Link
										to={`/student/courses/${courses[0]?.course_id}`}
										className="text-gray-500 hover:text-gray-700">
										{courses[0]?.title}
									</Link>
								</li>
							) : (
								<li>
									<span className="text-gray-400 mx-2">
										/
									</span>
									<Link
										to={`/student/cart/${student_id}`}
										className="text-gray-500 hover:text-gray-700">
										Shopping Cart
									</Link>
								</li>
							)}
							<li>
								<span className="text-gray-400 mx-2">/</span>
								<span className="text-gray-900">Checkout</span>
							</li>
						</ol>
					</nav>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<Card>
							<div className="p-6">
								<h2 className="text-xl font-semibold mb-4">
									Review Your Order
								</h2>
								<div className="space-y-6">
									{courses?.map((course) => (
										<div
											key={course.course_id}
											className="flex space-x-4">
											<img
												src={course.course_thumbnail}
												alt={course.title}
												className="w-24 h-24 object-cover rounded-lg"
											/>
											<div className="flex-grow">
												<h3 className="font-semibold">
													{course.title}
												</h3>
												{/* <p className="text-sm text-gray-500">Instructor: {course?.tutor_name}</p> */}
												<div className="flex items-center mt-2">
													<span className="text-yellow-400">
														★
													</span>
													<span className="ml-1 text-sm">
														{course.average_rating.toFixed(
															1
														)}{" "}
														({course.ratings_count}{" "}
														ratings)
													</span>
												</div>
												<span className="ml-1 text-xs text-gray-500">
													Published on{" "}
													{
														course.created_at.split(
															"T"
														)[0]
													}
												</span>
											</div>
											<div className="text-right">
												<p className="font-semibold">
													₹{course.price.toFixed(2)}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</Card>
					</div>

					<div className="lg:col-span-1">
						<Card>
							<div className="p-6">
								<h2 className="text-xl font-semibold mb-4">
									Order Summary
								</h2>
								<div className="space-y-4">
									<div className="flex justify-between">
										<span>Subtotal</span>
										<span>₹{subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span>EduEden Fee (5%)</span>
										<span>₹{eduEdenFee.toFixed(2)}</span>
									</div>
									<div className="flex justify-between font-semibold">
										<span>Total</span>
										<span className="text-xl text-green-600">
											₹{total.toFixed(2)}
										</span>
									</div>
									<RazorpayButton
										courses={courses}
										student_id={student_id}
										amount={total}
										handleSuccess={handlePaymentSuccess}
										className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 text-lg font-semibold"
									/>
									<p className="text-xs text-gray-500 text-center mt-2">
										By placing your order, you agree to our
										Terms of Service and Privacy Policy.
									</p>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
