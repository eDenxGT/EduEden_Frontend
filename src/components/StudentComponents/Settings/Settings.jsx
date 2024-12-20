import {
	User,
	Book,
	Bell,
	DollarSign,
	Lock,
	Eye,
	SettingsIcon,
	HelpCircle,
	Share2,
	ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Settings = () => {
	const isDarkMode = useSelector((state) => state.student.toggleTheme);

	const settingsItems = [
		{
			icon: User,
			title: "Personal Information",
			description: "Manage your profile and account details",
			link: "/student/settings/profile",
		},
		// {
		// 	icon: Lock,
		// 	title: "Security",
		// 	description: "Manage your account security and password",
		// 	link: "/student/settings/security",
		// },
		// {
		// 	icon: Bell,
		// 	title: "Notifications",
		// 	description: "Manage your notification preferences",
		// 	link: "/student/settings/notifications",
		// },
		// {
		// 	icon: Eye,
		// 	title: "Privacy",
		// 	description: "Manage your privacy settings",
		// 	link: "/student/settings/privacy",
		// },
		{
			icon: Book,
			title: "Courses",
			description: "View your active and completed courses",
			link: "/student/my-courses",
		},
		// {
		// 	icon: DollarSign,
		// 	title: "Payment Information",
		// 	description: "Manage your payment methods and billing history",
		// 	link: "/student/settings/payment",
		// },
		// {
		// 	icon: SettingsIcon,
		// 	title: "Preferences",
		// 	description:
		// 		"Set your language, time zone, and accessibility options",
		// 	link: "/student/settings/preferences",
		// },
		{
			icon: HelpCircle,
			title: "Help and Support",
			description: "Get help or contact support",
			link: "/contact-us",
		},
		// {
		// 	icon: Share2,
		// 	title: "Refer a Friend",
		// 	description: "Share your referral link and earn rewards",
		// 	link: "/student/settings/referral",
		// },
	];

	return (
		<div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
			<div
				className={`w-full min-h-screen ${
					isDarkMode
						? "bg-gray-900 text-white"
						: "bg-gray-100 text-gray-900"
				}`}>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
					<div className="flex justify-between items-center mb-8">
						<h1 className="text-2xl sm:text-3xl font-bold">
							Student Settings
						</h1>
					</div>

					<ul className="space-y-4">
						{settingsItems.map((item, index) => (
							<li
								key={index}
								className={`${
									isDarkMode
										? "bg-gray-800 hover:bg-gray-700"
										: "bg-white hover:bg-gray-50"
								} shadow-md rounded-lg overflow-hidden`}>
								<Link
									to={item.link}
									className="flex items-center justify-between
									p-4 sm:p-6 transition-colors duration-200">
									<div className="flex items-center space-x-4">
										<div
											className={`p-2 rounded-full ${
												isDarkMode
													? "bg-gray-700"
													: "bg-gray-100"
											}`}>
											<item.icon
												className={`w-6 h-6 ${
													isDarkMode
														? "text-primary-dark"
														: "text-primary"
												}`}
											/>
										</div>
										<div>
											<h2 className="text-lg font-semibold">
												{item.title}
											</h2>
											<p
												className={`text-sm ${
													isDarkMode
														? "text-gray-300"
														: "text-gray-600"
												}`}>
												{item.description}
											</p>
										</div>
									</div>
									<ChevronRight
										className={`w-5 h-5 ${
											isDarkMode
												? "text-gray-400"
												: "text-gray-500"
										}`}
									/>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Settings;
