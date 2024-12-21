import { Star, Users, Code, Smartphone, Database, Palette, Network, Bot, Gamepad2, ArrowRight, Calendar } from 'lucide-react';
import { IoIosGitBranch } from "react-icons/io";
import Card from "../../components/CommonComponents/Card";
import Button from "../../components/CommonComponents/Button";

import BoyImage from "../../assets/images/landingPage/Boy1.avif";
import BrototypeLogo from "../../assets/images/landingPage/platforms/brototype_logo.png";
import OpenAi from "../../assets/images/landingPage/platforms/openai-removebg-preview.png";
import Reactjs from "../../assets/images/landingPage/Reactjs.png";
import UiUx from "../../assets/images/landingPage/Ui_Ux.jpg";
import WebDev from "../../assets/images/landingPage/web-dev.jpg";
import PythonLogo from "../../assets/images/landingPage/python.jpg";
import MediumLogo from "../../assets/images/landingPage/platforms/medium-removebg-preview.png";
import Geek4Geeks from "../../assets/images/landingPage/platforms/gfg-removebg-preview.png";
import MernStack from "../../assets/images/landingPage/MERN.png";
import Google from "../../assets/images/landingPage/platforms/google.png";
import StackOverFlow from "../../assets/images/landingPage/platforms/stack-removebg-preview.png";
import YouTube from "../../assets/images/landingPage/platforms/yt.png";
import JavaScript from "../../assets/images/landingPage/java-script-360x270.jpg";
import Instructor from "../../assets/images/landingPage/Instructor.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
	const isDarkMode = useSelector((state) => state.public.toggleTheme);
	const navigate = useNavigate()
	const handleLoginRedirect = () => {
		navigate("/student/signin");
	};
	const handleTutorSignUpRedirect = () => {
		navigate("/tutor/signup");
	};
	return (
		<div
			className={`min-h-screen ${
				isDarkMode
					? "dark bg-gray-900"
					: "bg-gradient-to-b from-gray-50 to-gray-100"
			}`}>
			<main>
				{/* Hero Section */}
				<section
					className={`${
						isDarkMode
							? "bg-gray-800"
							: "bg-gradient-to-r from-[#FFEEE8] to-[#FFF6F0]"
					}`}>
					<div className="container mx-auto px-4 py-12 md:py-0 flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-64px)]">
						<div className="md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
							<div className="flex-col space-y-4 md:space-y-6 justify-center items-start max-w-xl px-4">
								<h1
									className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${
										isDarkMode
											? "text-white"
											: "text-gray-800"
									} leading-tight`}>
									Master{" "}
									<span className="text-[#FF5722]">
										Code,
									</span>
									<br />
									Step by Step
								</h1>
								<p
									className={`text-base sm:text-lg md:text-xl ${
										isDarkMode
											? "text-gray-300"
											: "text-gray-600"
									} max-w-md`}>
									Skip the &#34;what should I learn next?&#34;
									confusion. Follow our structured paths,
									build awesome projects, and get expert help
									whenever you need it.
								</p>
								<Button
								onClick={handleLoginRedirect}
									text="Become A Developer"
									className={`w-auto max-w-fit px-4 sm:px-6 py-2 sm:py-3 ${
										isDarkMode
											? "bg-blue-600 hover:bg-blue-700"
											: "bg-orange-500 hover:bg-orange-600"
									} text-white rounded-full text-base sm:text-lg font-semibold transition-colors duration-300`}
								/>
							</div>
						</div>
						<div className="md:w-1/2 px-4 md:px-8">
							<img
								src={BoyImage}
								alt="Student learning to code"
								className="w-full max-w-lg mx-auto h-auto shadow-2xl rounded-lg"
							/>
						</div>
					</div>
				</section>

				{/* Browse Categories Section */}
				<section
					className={`container mx-auto my-12 sm:my-20 xl:max-w-6xl px-4 sm:px-8 md:px-12 py-8 sm:py-16 rounded-md ${
						isDarkMode ? "bg-gray-800" : ""
					}`}>
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
						<h2
							className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
								isDarkMode ? "text-white" : "text-gray-800"
							}`}>
							Browse Categories
						</h2>
						<button
							className={`${
								isDarkMode
									? "text-blue-400 hover:text-blue-300"
									: "text-[#ff6b35] hover:text-[#ff8c35]"
							} flex items-center text-base sm:text-lg font-semibold transition-colors duration-300`}>
							See more
							<ArrowRight
								className="ml-2 h-5 w-5"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
						{categories.map((category) => (
							<Card
								key={category.name}
								className={`p-3 sm:p-4 md:p-6 ${
									isDarkMode
										? "bg-gray-700 hover:bg-gray-600"
										: "bg-white hover:bg-gray-50"
								} transition-all duration-300 cursor-pointer rounded-xl`}>
								<div className="flex flex-col items-center text-center gap-2 sm:gap-4">
									<div
										className={`${
											isDarkMode
												? "bg-gray-600"
												: "bg-gray-100"
										} shadow-lg p-3 sm:p-4 rounded-full`}>
										{category.icon}
									</div>
									<div>
										<h3
											className={`font-semibold text-base sm:text-lg mb-1 ${
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}`}>
											{category.name}
										</h3>
										<p
											className={`text-xs sm:text-sm ${
												isDarkMode
													? "text-gray-300"
													: "text-gray-600"
											}`}>
											{category.count} Courses
										</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</section>

				{/* Best Selling Courses Section */}
				<section
					className={`${
						isDarkMode ? "bg-gray-900" : "bg-white"
					} py-8 sm:py-16`}>
					<div className="container xl:max-w-6xl mx-auto px-4">
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
							<h2
								className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
									isDarkMode ? "text-white" : "text-gray-800"
								}`}>
								Top Rated Courses
							</h2>
							<button
								className={`${
									isDarkMode
										? "text-blue-400 hover:text-blue-300"
										: "text-[#ff6b35] hover:text-[#ff8c35]"
								} flex items-center text-base sm:text-lg font-semibold transition-colors duration-300`}>
								See more
								<ArrowRight
									className="ml-2 h-5 w-5"
									aria-hidden="true"
								/>
							</button>
						</div>
						<div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{courses.slice(0, 3).map((course) => (
								<Card
									key={course.title}
									className={`overflow-hidden rounded-xl ${
										isDarkMode ? "bg-gray-800" : "bg-white"
									} shadow-lg hover:shadow-xl transition-all duration-300`}>
									<img
										alt={course.title}
										className="aspect-video w-full object-cover h-48 sm:h-56"
										src={course.image}
									/>
									<div className="p-4 sm:p-6">
										<h3
											className={`font-bold text-lg sm:text-xl min-h-[3rem] sm:min-h-[3.5rem] mb-2 ${
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}`}>
											{course.title}
										</h3>
										<div className="flex items-center gap-2 mb-2">
											<Star className="h-4 sm:h-5 w-4 sm:w-5 fill-yellow-400 text-yellow-400" />
											<span
												className={`text-base sm:text-lg font-medium ${
													isDarkMode
														? "text-white"
														: "text-gray-800"
												}`}>
												{course.rating}
											</span>
											<span
												className={`text-sm sm:text-base ${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												}`}>
												({course.reviews} reviews)
											</span>
										</div>
										<div className="flex items-center gap-2 mb-4">
											<Users
												className={`h-4 sm:h-5 w-4 sm:w-5 ${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												}`}
											/>
											<span
												className={`text-sm sm:text-base ${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												}`}>
												{course.students} students
											</span>
										</div>
										<Button
											text="Enroll Now"
											className={`w-full ${
												isDarkMode
													? "bg-blue-600 hover:bg-blue-700"
													: "bg-orange-500 hover:bg-orange-600"
											} text-white py-2 rounded-full text-base sm:text-lg font-semibold transition-colors duration-300`}
										/>
									</div>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Best Selling Courses Section */}
				<section
					className={`${
						isDarkMode ? "bg-gray-900" : "bg-white"
					} py-16`}>
					<div className="container xl:max-w-6xl mx-auto px-4">
						<div className="flex justify-between items-center mb-12">
							<h2
								className={`text-3xl md:text-4xl font-bold ${
									isDarkMode ? "text-white" : "text-gray-800"
								}`}>
								Best Selling Courses
							</h2>
							<button
								className={`${
									isDarkMode
										? "text-blue-400 hover:text-blue-300"
										: "text-[#ff6b35] hover:text-[#ff8c35]"
								} flex items-center text-lg font-semibold transition-colors duration-300`}>
								See more
								<ArrowRight
									className="ml-2 h-5 w-5"
									aria-hidden="true"
								/>
							</button>
						</div>
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{courses.slice(0, 3).map((course) => (
								<Card
									key={course.title}
									className={`overflow-hidden rounded-xl ${
										isDarkMode ? "bg-gray-800" : "bg-white"
									} shadow-lg hover:shadow-xl transition-all duration-300`}>
									<img
										alt={course.title}
										className="aspect-video w-full object-cover"
										src={course.image}
									/>
									<div className="p-6">
										<h3
											className={`font-bold text-xl min-h-[3.5rem] mb-2 ${
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}`}>
											{course.title}
										</h3>
										<div className="flex items-center gap-2 mb-2">
											<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
											<span
												className={`text-lg font-medium ${
													isDarkMode
														? "text-white"
														: "text-gray-800"
												}`}>
												{course.rating}
											</span>
											<span
												className={`${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												}`}>
												({course.reviews} reviews)
											</span>
										</div>
										<div className="flex items-center gap-2 mb-4">
											<Users
												className={`h-5 w-5 ${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												}`}
											/>
											<span
												className={`${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												}`}>
												{course.students} students
											</span>
										</div>
										<Button
											text="Enroll Now"
											className={`w-full ${
												isDarkMode
													? "bg-blue-600 hover:bg-blue-700"
													: "bg-orange-500 hover:bg-orange-600"
											} text-white py-2 rounded-full text-lg font-semibold transition-colors duration-300`}
										/>
									</div>
								</Card>
							))}
						</div>
					</div>
				</section>

	
				{/* Best Tutors Section */}
						{/*
				<section
					className={`${
						isDarkMode ? "bg-gray-900" : "bg-white"
					} py-16`}>
					<div className="container xl:max-w-6xl mx-auto px-4">
						<div className="flex justify-between items-center mb-12">
							<h2
								className={`text-3xl md:text-4xl font-bold ${
									isDarkMode ? "text-white" : "text-gray-800"
								}`}>
								Best Tutors
							</h2>
							<button
								className={`${
									isDarkMode
										? "text-blue-400 hover:text-blue-300"
										: "text-[#ff6b35] hover:text-[#ff8c35]"
								} flex items-center text-lg font-semibold transition-colors duration-300`}>
								See more
								<ArrowRight
									className="ml-2 h-5 w-5"
									aria-hidden="true"
								/>
							</button>
						</div>
						 <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{instructors.map((instructor) => (
								<Card
									key={instructor.name}
									className={`overflow-hidden rounded-xl ${
										isDarkMode ? "bg-gray-800" : "bg-white"
									} shadow-lg hover:shadow-xl transition-all duration-300`}>
									<img
										alt={instructor.name}
										className="w-full h-48 object-cover"
										src={Instructor}
									/>
									<div className="p-6">
										<h3
											className={`font-bold text-xl mb-2 ${
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}`}>
											{instructor.name}
										</h3>
										<p
											className={`${
												isDarkMode
													? "text-gray-400"
													: "text-gray-600"
											} mb-4`}>
											{instructor.title}
										</p>
										<Button
											text="View Profile"
											className={`w-full ${
												isDarkMode
													? "bg-blue-600 hover:bg-blue-700"
													: "bg-orange-500 hover:bg-orange-600"
											} text-white py-2 rounded-full text-lg font-semibold transition-colors duration-300`}
										/>
									</div>
								</Card>
							))}
						</div>
					</div>
				</section> */}

				{/* Become a Mentor Section */}
				<section
					className={`${
						isDarkMode
							? "bg-gray-900"
							: "bg-gradient-to-r from-[#FFEEE8] to-[#FFF6F0]"
					} py-16`}>
					<div className="container mx-auto xl:max-w-6xl px-4">
						<div className="grid md:grid-cols-2 gap-12">
							<Card
								className={`${
									isDarkMode ? "bg-gray-800" : "bg-white"
								} flex flex-col justify-evenly p-8 px-14 rounded-xl shadow-lg`}>
								<div>
									<h2
										className={`text-3xl font-bold ${
											isDarkMode
												? "text-blue-400"
												: "text-[#ff6b35]"
										} mb-4`}>
										Become a Mentor
									</h2>
									<p
										className={`text-lg ${
											isDarkMode
												? "text-gray-300"
												: "text-gray-600"
										} mb-6`}>
										Join our community of expert instructors
										and share your knowledge with students
										worldwide.
									</p>
									<Button
									onClick={handleTutorSignUpRedirect}
										text="Apply Now"
										className={`${
											isDarkMode
												? "bg-blue-600 hover:bg-blue-700"
												: "bg-orange-500 hover:bg-orange-600"
										} max-w-fit text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300`}
									/>
								</div>
							</Card>
							<div className="space-y-8">
								<h3
									className={`text-3xl font-bold ${
										isDarkMode
											? "text-white"
											: "text-gray-800"
									} mb-6`}>
									Your teaching & earning steps
								</h3>
								{teachingSteps.map((step, index) => (
									<div
										key={index}
										className="flex gap-6 items-start">
										<div
											className={`flex h-12 w-12 items-center justify-center rounded-full ${
												isDarkMode
													? "bg-blue-600"
													: "bg-[#ff6b35]"
											} text-white text-xl font-bold`}>
											{index + 1}
										</div>
										<div>
											<h4
												className={`text-xl font-semibold mb-2 ${
													isDarkMode
														? "text-white"
														: "text-gray-800"
												}`}>
												{step.title}
											</h4>
											<p
												className={`${
													isDarkMode
														? "text-gray-300"
														: "text-gray-600"
												}`}>
												{step.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Learning Resources Section */}
				<section
					className={`${
						isDarkMode
							? "bg-gray-900"
							: "bg-gradient-to-b from-white to-[#FFEEE8]"
					} py-16`}>
					<div className="container mx-auto xl:max-w-6xl px-4">
						<h2
							className={`text-3xl font-bold text-center mb-12 ${
								isDarkMode ? "text-white" : "text-gray-800"
							} animate-fade-in`}>
							Learning Resources
						</h2>
						<div className="flex justify-center items-center gap-12 flex-wrap">
							{platforms.map((platform, index) => (
								<div
									key={platform.name}
									className="transition-all duration-300 hover:opacity-80 hover:scale-110 transform animate-fade-in"
									style={{
										animationDelay: `${index * 0.1}s`,
									}}>
									<img
										src={platform.logo}
										alt={`${platform.name} logo`}
										className={`object-contain ${
											platform.height
										} ${isDarkMode ? "filter invert" : ""}`}
									/>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>

		</div>
	);
}

const categories = [
	{
		name: "Web Development",
		count: "150",
		icon: <Code className="h-8 w-8 text-blue-600" />,
	},
	{
		name: "Mobile Development",
		count: "100",
		icon: <Smartphone className="h-8 w-8 text-green-600" />,
	},
	{
		name: "Data Science",
		count: "120",
		icon: <Database className="h-8 w-8 text-purple-600" />,
	},
	{
		name: "UI Design",
		count: "80",
		icon: <Palette className="h-8 w-8 text-orange-600" />,
	},
	{
		name: "Game Development",
		count: "90",
		icon: <Gamepad2 className="h-8 w-8 text-red-600" />,
	},
	{
		name: "Cyber Security",
		count: "70",
		icon: <Network className="h-8 w-8 text-indigo-600" />,
	},
	{
		name: "Machine Learning",
		count: "110",
		icon: <Bot className="h-8 w-8 text-pink-600" />,
	},
	{
		name: "Git & Version Control",
		count: "95",
		icon: <IoIosGitBranch className="h-8 w-8 text-teal-600" />,
	},
];

const courses = [
	{
		title: "UI & UX Designing",
		rating: "4.8",
		reviews: "2.5k",
		students: "15,000",
		price: "99.99",
		image: UiUx,
	},
	{
		title: "Web Development Bootcamp",
		rating: "4.9",
		reviews: "3.2k",
		students: "20,000",
		price: "89.99",
		image: WebDev,
	},
	{
		title: "Python Programming Masterclass",
		rating: "4.7",
		reviews: "1.8k",
		students: "12,000",
		price: "79.99",
		image: PythonLogo,
	},
	{
		title: "React.js Advanced Patterns",
		rating: "4.9",
		reviews: "1.2k",
		students: "8,000",
		price: "94.99",
		image: Reactjs,
	},
	{
		title: "MERN Stack Development",
		rating: "4.8",
		reviews: "2.1k",
		students: "10,000",
		price: "99.99",
		image: MernStack,
	},
	{
		title: "Machine Learning Fundamentals",
		rating: "4.6",
		reviews: "1.5k",
		students: "7,500",
		price: "89.99",
		image: PythonLogo,
	},
];

const platforms = [
	{
		name: "Brototype",
		logo: BrototypeLogo,
		height: "h-32",
	},
	{
		name: "YouTube",
		logo: YouTube,
		height: "h-6",
	},
	{
		name: "Google",
		logo: Google,
		height: "h-6",
	},
	{
		name: "Stack Overflow",
		logo: StackOverFlow,
		height: "h-20",
	},
	{
		name: "Medium",
		logo: MediumLogo,
		height: "h-20",
	},
	{
		name: "GeeksForGeeks",
		logo: Geek4Geeks,
		height: "h-12",
	},
	{
		name: "OpenAI",
		logo: OpenAi,
		height: "h-20",
	},
];

const events = [
	{
		title: "JavaScript Quiz Competition",
		date: "Nov 15, 2024",
		participants: "500+",
		image: JavaScript,
	},
	{
		title: "Python Challenge",
		date: "Nov 20, 2024",
		participants: "750+",
		image: PythonLogo,
	},
	{
		title: "React Code Challenge",
		date: "Nov 25, 2024",
		participants: "600+",
		image: Reactjs,
	},
];

const teachingSteps = [
	{
		title: "Apply to teach",
		description: "Complete your application to become an instructor",
	},
	{
		title: "Create your course",
		description: "Use our platform tools to build engaging content",
	},
	{
		title: "Start earning",
		description: "Get paid for every student who takes your course",
	},
];
