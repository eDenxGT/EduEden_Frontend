import { useState } from "react";
import { useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import {
	Star,
	Users,
	Calendar,
	Zap,
	BookOpen,
	DollarSign,
	ArrowRight,
   UserCircle2Icon,
} from "lucide-react";
import Button from "../../../components/CommonComponents/Button";

// eslint-disable-next-line react/prop-types
const QuickStatCard = ({ icon, title, value, isDarkMode }) => (
	<div
		className={`${
			isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
		} p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl`}>
		<div className="flex items-center">
			<div
				className={`flex-shrink-0 ${
					isDarkMode ? "bg-blue-600" : "bg-[#ff6b35]"
				} rounded-md p-3 text-white`}>
				{icon}
			</div>
			<div className="ml-5 w-0 flex-1">
				<dl>
					<dt
						className={`text-sm font-medium ${
							isDarkMode ? "text-gray-400" : "text-gray-600"
						} truncate`}>
						{title}
					</dt>
					<dd className="text-lg font-medium">{value}</dd>
				</dl>
			</div>
		</div>
	</div>
);

export default function TutorDashboard() {
	const isDarkMode = useSelector((state) => state.tutor.toggleTheme);
	const [activeChat, setActiveChat] = useState(null);
	const [chatMessage, setChatMessage] = useState("");

	const tutorData = useSelector((state) => state.tutor.tutorData);

	const showNotification = (message) => {
		toast(message, {
			duration: 3000,
			position: "top-right",
		});
	};


	const chatList = [
		{
			id: 1,
			name: "John Doe",
			lastMessage: "Hello, I have a question about...",
		},
		{
			id: 2,
			name: "Jane Smith",
			lastMessage: "Thanks for the clarification!",
		},
		{
			id: 3,
			name: "Mike Johnson",
			lastMessage: "When is the next live session?",
		},
	];

	return (
		<div
			className={`min-h-screen ${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800"
			}`}>
			<Toaster theme={isDarkMode ? "dark" : "light"} />
			<div className="flex">
				<main className="flex-1 p-6 max-w-7xl mx-auto w-full">
					<div
						className={`mb-6 ${
							isDarkMode ? "bg-gray-800" : "bg-white"
						} p-6 rounded-lg shadow-lg`}>
						<div className="flex items-center gap-4">
							{tutorData?.avatar ? (
								<img
									src={tutorData?.avatar}
									alt="Tutor"
									className="h-16 w-16 rounded-full"
								/>
							) : (
								<UserCircle2Icon className="h-16 w-16 text-gray-500"/>
							)}
							<div>
								<h2 className="text-xl font-bold">
									{tutorData?.full_name
										? tutorData?.full_name
										: "Tutor Name Here"}
								</h2>
								<p
									className={`text-sm ${
										isDarkMode
											? "text-gray-400"
											: "text-gray-600"
									}`}>
									{tutorData?.email
										? tutorData?.email
										: "Tutor Email Here"}
								</p>
								<p
									className={`text-sm ${
										isDarkMode
											? "text-gray-400"
											: "text-gray-600"
									}`}>
									{tutorData?.bio
										? tutorData?.bio
										: "Add Your Bio to add here"}
								</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<QuickStatCard
							icon={<DollarSign className="h-6 w-6" />}
							title="Total Earnings"
							value={
								tutorData?.total_revenue
									? tutorData?.total_revenue
									: "No earnings yet"
							}
							isDarkMode={isDarkMode}
						/>
						<QuickStatCard
							icon={<BookOpen className="h-6 w-6" />}
							title="Active Courses"
							value={
								tutorData?.course_count
									? tutorData?.course_count
									: "No Courses yet"
							}
							isDarkMode={isDarkMode}
						/>
						<QuickStatCard
							icon={<Users className="h-6 w-6" />}
							title="Total Students"
							value={
								tutorData?.students_enrolled
									? tutorData?.students_enrolled
									: "No students yet"
							}
							isDarkMode={isDarkMode}
						/>
						<QuickStatCard
							icon={<Star className="h-6 w-6" />}
							title="Average Rating"
							value={
								tutorData?.tutor_rating
									? tutorData?.tutor_rating
									: "No rating yet"
							}
							isDarkMode={isDarkMode}
						/>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
						<div
							className={`${
								isDarkMode ? "bg-gray-800" : "bg-white"
							} p-6 rounded-lg shadow-lg`}>
							<div className="flex justify-between items-center mb-4">
								<h2
									className={`text-xl font-bold ${
										isDarkMode
											? "text-white"
											: "text-gray-800"
									}`}>
									Upcoming Live Classes
								</h2>
								<button
									className={`${
										isDarkMode
											? "text-blue-400 hover:text-blue-300"
											: "text-[#ff6b35] hover:text-[#ff8c35]"
									} flex items-center text-sm font-semibold transition-colors duration-300`}>
									See more
									<ArrowRight
										className="ml-2 h-4 w-4"
										aria-hidden="true"
									/>
								</button>
							</div>
							<ul className="space-y-4">
								{[
									{
										course: "Web Development Basics",
										date: "Nov 17, 2024 - 10:00 AM",
									},
									{
										course: "Advanced JavaScript",
										date: "Nov 18, 2024 - 2:00 PM",
									},
									{
										course: "React Fundamentals",
										date: "Nov 20, 2024 - 11:00 AM",
									},
								].map((item, index) => (
									<li
										key={index}
										className={`flex justify-between items-center p-4 rounded-lg ${
											isDarkMode
												? "bg-gray-700"
												: "bg-gray-100"
										}`}>
										<div className="flex flex-col">
											<span className="font-medium">
												{item.course}
											</span>
											<span
												className={`text-sm ${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												}`}>
												{item.date}
											</span>
										</div>
										<Button
											text="Start Class"
											onClick={() =>
												showNotification(
													`Starting class: ${item.course}`
												)
											}
											className={`rounded-md max-w-fit ${
												isDarkMode
													? "bg-blue-600 hover:bg-blue-700 text-white"
													: "bg-gradient-to-r from-[#ff6b35] to-[#ff8c35] hover:from-[#ff8c35] hover:to-[#ff6b35] text-white"
											}`}
										/>
									</li>
								))}
							</ul>
						</div>

						<div
							className={`${
								isDarkMode ? "bg-gray-800" : "bg-white"
							} p-6 rounded-lg shadow-lg`}>
							<div className="flex justify-between items-center mb-4">
								<h2
									className={`text-xl font-bold ${
										isDarkMode
											? "text-white"
											: "text-gray-800"
									}`}>
									Video Sessions
								</h2>
								<button
									className={`${
										isDarkMode
											? "text-blue-400 hover:text-blue-300"
											: "text-[#ff6b35] hover:text-[#ff8c35]"
									} flex items-center text-sm font-semibold transition-colors duration-300`}>
									See more
									<ArrowRight
										className="ml-2 h-4 w-4"
										aria-hidden="true"
									/>
								</button>
							</div>
							<ul className="space-y-4">
								{[
									{
										title: "One-on-one with John Doe",
										time: "3:00 PM - 4:00 PM",
									},
									{
										title: "Group Session: JavaScript Q&A",
										time: "5:00 PM - 6:30 PM",
									},
									{
										title: "Office Hours",
										time: "7:00 PM - 8:00 PM",
									},
								].map((session, index) => (
									<li
										key={index}
										className={`flex justify-between items-center p-4 rounded-lg ${
											isDarkMode
												? "bg-gray-700"
												: "bg-gray-100"
										}`}>
										<div className="flex flex-col">
											<span className="font-medium">
												{session.title}
											</span>
											<span
												className={`text-sm ${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												}`}>
												{session.time}
											</span>
										</div>
										<Button
											text="Join"
											onClick={() =>
												showNotification(
													`Joining video session: ${session.title}`
												)
											}
											className={`rounded-md max-w-fit px-5 ${
												isDarkMode
													? "bg-green-600 hover:bg-green-700 text-white"
													: "bg-gradient-to-r from-[#ff6b35] to-[#ff8c35] hover:from-[#ff8c35] hover:to-[#ff6b35] text-white"
											}`}
										/>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div
						className={`mb-8 ${
							isDarkMode ? "bg-gray-800" : "bg-white"
						} p-6 rounded-lg shadow-lg`}>
						<h2
							className={`text-xl font-bold mb-4 ${
								isDarkMode ? "text-white" : "text-gray-800"
							}`}>
							Revenue and Student Growth
						</h2>
						REVENUE CHART HERE
						{/* <div className="h-80">
              <Line 
                data={revenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        color: isDarkMode ? 'white' : 'black',
                      }
                    },
                    x: {
                      ticks: {
                        color: isDarkMode ? 'white' : 'black',
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: isDarkMode ? 'white' : 'black',
                      }
                    }
                  }
                }}
              />
            </div> */}
					</div>

					<div
						className={`mb-8 ${
							isDarkMode ? "bg-gray-800" : "bg-white"
						} p-6 rounded-lg shadow-lg`}>
						<h2
							className={`text-xl font-bold mb-4 ${
								isDarkMode ? "text-white" : "text-gray-800"
							}`}>
							Messages
						</h2>
						<div className="flex h-96">
							<div className="w-1/2 border-r pr-4">
								<h3 className="font-semibold mb-2">
									Conversations
								</h3>
								<ul className="space-y-2">
									{chatList.map((chat) => (
										<li
											key={chat.id}
											onClick={() => setActiveChat(chat)}
											className={`p-2 rounded-lg cursor-pointer ${
												activeChat &&
												activeChat.id === chat.id
													? isDarkMode
														? "bg-blue-900"
														: "bg-[#FFEEE8]"
													: isDarkMode
													? "hover:bg-gray-700"
													: "hover:bg-gray-100"
											}`}>
											<p className="font-medium">
												{chat.name}
											</p>
											<p
												className={`text-sm truncate ${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												}`}>
												{chat.lastMessage}
											</p>
										</li>
									))}
								</ul>
							</div>
							<div className="w-1/2 pl-4 flex flex-col">
								{activeChat ? (
									<>
										<div className="flex-1 overflow-y-auto mb-4">
											<p
												className={`p-2 rounded-lg ${
													isDarkMode
														? "bg-gray-700"
														: "bg-gray-100"
												}`}>
												This is where the chat messages
												would appear.
											</p>
										</div>
										<div className="flex">
											<input
												type="text"
												value={chatMessage}
												onChange={(e) =>
													setChatMessage(
														e.target.value
													)
												}
												placeholder="Type a message..."
												className={`flex-1 p-2 rounded-l-lg ${
													isDarkMode
														? "bg-gray-700 text-white"
														: "bg-gray-100 text-gray-800"
												}`}
											/>
											<Button
												text="Send"
												onClick={() => {
													showNotification(
														`Message sent to ${activeChat.name}`
													);
													setChatMessage("");
												}}
												className={`max-w-fit rounded-r-lg ${
													isDarkMode
														? "bg-blue-600 hover:bg-blue-700 text-white"
														: "bg-gradient-to-r from-[#ff6b35] to-[#ff8c35] hover:from-[#ff8c35] hover:to-[#ff6b35] text-white"
												}`}
											/>
										</div>
									</>
								) : (
									<p className="text-center mt-4">
										Select a conversation to start chatting
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
						<div
							className={`${
								isDarkMode ? "bg-gray-800" : "bg-white"
							} p-6 rounded-lg shadow-lg`}>
							<h2
								className={`text-xl font-bold mb-4 ${
									isDarkMode ? "text-white" : "text-gray-800"
								}`}>
								Recent Activities
							</h2>
							<ul className="space-y-4">
								{[
									{
										icon: Calendar,
										message:
											"Live session: CSS Grid Layout",
										date: "Nov 18, 2024 - 10:00 AM",
									},
									{
										icon: Calendar,
										message:
											"Live session: CSS Grid Layout",
										date: "Nov 18, 2024 - 10:00 AM",
									},
									{
										icon: Calendar,
										message:
											"Live session: CSS Grid Layout",
										date: "Nov 18, 2024 - 10:00 AM",
									},
									{
										icon: Calendar,
										message:
											"Live session: CSS Grid Layout",
										date: "Nov 18, 2024 - 10:00 AM",
									},
								].map((activity, index) => (
									<li
										key={index}
										className={`${
											isDarkMode
												? "bg-gray-700"
												: "bg-gray-100"
										} p-2 rounded-lg flex items-start`}>
										<span
											className={`flex-shrink-0 h-6 w-6 rounded-full ${
												isDarkMode
													? "bg-blue-900"
													: "bg-[#FFEEE8]"
											} flex items-center justify-center`}>
											<activity.icon
												className={`h-4 w-4 ${
													isDarkMode
														? "text-blue-300"
														: "text-[#ff6b35]"
												}`}
											/>
										</span>
										<div className="ml-3">
											<p
												className={`text-sm ${
													isDarkMode
														? "text-gray-300"
														: "text-gray-700"
												}`}>
												{activity.message}
											</p>
											<p
												className={`text-xs ${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												} mt-1`}>
												{activity.date}
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>

						<div
							className={`${
								isDarkMode ? "bg-gray-800" : "bg-white"
							} p-6 rounded-lg shadow-lg`}>
							<h2
								className={`text-xl font-bold mb-4 ${
									isDarkMode ? "text-white" : "text-gray-800"
								}`}>
								Platform Updates
							</h2>
							<ul className="space-y-4">
								{[
									{
										message:
											"New feature: AI-powered grading assistant",
										date: "Nov 16, 2024",
									},
									{
										message:
											"Upcoming webinar: Engaging students online",
										date: "Nov 19, 2024",
									},
									{
										message:
											"Platform maintenance scheduled",
										date: "Nov 21, 2024",
									},
								].map((update, index) => (
									<div
										key={index}
										className={`flex items-center p-4 rounded-lg ${
											isDarkMode
												? "bg-gray-700"
												: "bg-gray-100"
										}`}
										onClick={() =>
											showNotification(update.message)
										}>
										<Zap
											className={`h-4 w-4 mr-2 ${
												isDarkMode
													? "text-yellow-500"
													: "text-[#ff6b35]"
											}`}
										/>
										<div>
											<span
												className={`text-sm ${
													isDarkMode
														? "text-gray-300"
														: "text-gray-700"
												}`}>
												{update.message}
											</span>
											<p
												className={`text-xs ${
													isDarkMode
														? "text-gray-400"
														: "text-gray-600"
												} mt-1`}>
												{update.date}
											</p>
										</div>
									</div>
								))}
							</ul>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
