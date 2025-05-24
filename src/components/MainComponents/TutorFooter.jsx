import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const TutorFooter = ({ role }) => {
	const currentYear = new Date().getFullYear();
	const tutorToggleTheme = useSelector((state) => state.tutor.toggleTheme);
	const adminToggleTheme = useSelector((state) => state.admin.toggleTheme);

	const toggleTheme = role === "tutor" ? tutorToggleTheme : adminToggleTheme;

	return (
		<footer
			className={`w-full border-t py-4 transition-colors duration-300
        ${
			toggleTheme
				? "bg-gray-900 border-gray-700"
				: "bg-white border-gray-200"
		}`}>
			<div className="container mx-auto px-6">
				<div className="flex flex-col sm:flex-row justify-between items-center">
					<div
						className={`text-sm ${
							toggleTheme ? "text-gray-400" : "text-gray-500"
						}`}>
						© {currentYear} - EduEden, All rights reserved
					</div>

					<nav className="flex gap-4 mt-2 sm:mt-0">
						<a
							href="/faqs"
							className={`text-sm transition-colors
                ${
					toggleTheme
						? "text-gray-400 hover:text-gray-200"
						: "text-gray-500 hover:text-gray-700"
				}`}>
							FAQs
						</a>
						<a
							href="/privacy-policy"
							className={`text-sm transition-colors
                ${
					toggleTheme
						? "text-gray-400 hover:text-gray-200"
						: "text-gray-500 hover:text-gray-700"
				}`}>
							Privacy Policy
						</a>
						<a
							href="/terms"
							className={`text-sm transition-colors
                ${
					toggleTheme
						? "text-gray-400 hover:text-gray-200"
						: "text-gray-500 hover:text-gray-700"
				}`}>
							Terms & Condition
						</a>
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default TutorFooter;
