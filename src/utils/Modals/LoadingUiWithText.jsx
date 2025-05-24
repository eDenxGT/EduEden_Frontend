/* eslint-disable react/prop-types */
import { PiGraduationCap } from "react-icons/pi";

const LoadingUi = ({ isDarkMode = true, text }) => {
	const textArray = text?.split("");

	const letters = textArray || ["E", "d", "u", "E", "d", "e", "n"];

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 ${
				isDarkMode ? "bg-gray-900" : "bg-white"
			}`}>
			<div className="flex flex-col items-center gap-4">
				<PiGraduationCap className="h-12 w-12 text-[#FF5722] animate-bounce" />
				<div className="flex flex-col items-center gap-2">
					{text ? (
						<p
							className={`text-2xl font-bold ${
								isDarkMode ? "text-white" : "text-gray-900"
							}`}>
							{text}
						</p>
					) : (
						<div className="flex items-center">
							{letters.map((letter, index) => (
								<span
									key={index}
									className={`text-4xl font-bold ${
										isDarkMode
											? "text-white"
											: "text-gray-900"
									} opacity-0 animate-bidirectionalFadeIn`}
									style={{
										animationDelay: `${index * 300}ms`,
										animationFillMode: "forwards",
									}}>
									{letter}
								</span>
							))}
						</div>
					)}
				</div>
				<div
					className={`w-16 h-1 mt-2 rounded-full overflow-hidden ${
						isDarkMode ? "bg-gray-700" : "bg-gray-200"
					}`}>
					<div className="w-full h-full bg-[#FF5722] animate-loading"></div>
				</div>
			</div>
		</div>
	);
};

export default LoadingUi;
