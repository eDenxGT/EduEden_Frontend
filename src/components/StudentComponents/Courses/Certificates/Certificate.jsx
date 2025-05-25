/* eslint-disable react/prop-types */
import { PiGraduationCap, PiSignatureThin  } from "react-icons/pi";

const Certificate = ({
	studentName,
	courseName,
	completionDate,
	certificateId,
	companyCEO = "eDen",
}) => {
	console.log(courseName)
	return (
		<div className="w-[800px] h-[600px] bg-white shadow-lg border-8 border-double border-orange-500 rounded-nmone">
			<div className="h-full flex flex-col items-center justify-between p-10 bg-gray-50 rounded-lg">
				{/* Header */}
				<header className="text-center mb-6">
					<div className="flex items-center justify-center mb-4">
						<PiGraduationCap
							className="h-12 w-12 text-[#FF5722]"
							aria-hidden="true"
						/>
					</div>
					<h1 className="text-[#FF5722] text-3xl font-bold mb-2">
						EduEden
					</h1>
					<h2 className="text-4xl font-bold text-gray-800 mb-1">
						CERTIFICATE
					</h2>
					<h3 className="text-xl text-gray-600 tracking-wide">
						OF ACHIEVEMENT
					</h3>
				</header>

				{/* Main Content */}
				<main className="text-center space-y-4 my-8">
					<p className="text-gray-600">
						THIS CERTIFICATE IS PRESENTED TO
					</p>
					<p className="text-4xl font-serif text-[#FF5722] italic p border-b-2 border-gray-300 pb-2">
						{studentName}
					</p>
					<p className="max-w-lg text-center text-gray-600">
						In recognition of successfully completing the course
						<span className="font-semibold text-gray-800 mt-2 text-2xl block">
							{courseName}
						</span>
					</p>
				</main>

				{/* Footer */}
				<footer className="w-full">
					{/* Signatures */}
					<div className="flex justify-center px-12 mb-8">
						<div className="text-center flex flex-col justify-center items-center">
							<div className="w-48  mb-2"></div>
							<p className="text-sm text-gray-800 font-semibold">
                  <PiSignatureThin size={50} className="border-b  border-gray-300 mb-2 text-blue-500" />
								{companyCEO}
							</p>
							<p className="text-xs  text-gray-600">CEO</p>
						</div>
					</div>

					{/* Certificate ID and Date */}
					{/* <div className="flex justify-between text-xs text-gray-400">
						<span>Certificate ID: {certificateId}</span>
						<span>{completionDate}</span>
					</div> */}
				</footer>
			</div>
		</div>
	);
};

export default Certificate;
