import {
	User,
	Book,
	MessageCircle,
	DollarSign,
	Lock,
	Calendar,
	Eye,
	Star,
	Bell,
	SettingsIcon,
	ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TutorSettings() {
	const isDarkMode = useSelector((state) => state.tutor.toggleTheme);

	const settingsItems = [
		{
			icon: User,
			title: "Profile",
			description: "Manage your personal information",
			link: "/tutor/settings/profile",
		},
		{
			icon: Book,
			title: "Courses",
			description: "Manage your course offerings",
			link: "/tutor/my-courses",
		},
		{
			icon: MessageCircle,
			title: "Chats",
			description: "Manage your messaging preferences",
			link: "/tutor/chat",
		},
		{
			icon: DollarSign,
			title: "Earnings",
			description: "Manage your earnings and payouts",
			link: "/tutor/earnings",
		},
		// {
		// 	icon: Lock,
		// 	title: "Security",
		// 	description: "Manage your account security",
		// 	link: "/security-settings",
		// },
		{
			icon: Calendar,
			title: "Availability",
			description: "Set your teaching schedule",
			link: "/manage-availability",
		},
		// {
		// 	icon: Eye,
		// 	title: "Privacy",
		// 	description: "Manage your privacy settings",
		// 	link: "/privacy-settings",
		// },
		// {
		// 	icon: Star,
		// 	title: "Reviews",
		// 	description: "Manage your student reviews",
		// 	link: "/manage-reviews",
		// },
		// {
		// 	icon: Bell,
		// 	title: "Notifications",
		// 	description: "Manage your notification preferences",
		// 	link: "/notification-settings",
		// },
		// {
		// 	icon: SettingsIcon,
		// 	title: "Account Settings",
		// 	description: "Manage your account preferences",
		// 	link: "/account-settings",
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
							Tutor Settings
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
}
