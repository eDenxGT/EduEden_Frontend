import { PiGraduationCap } from "react-icons/pi";
import {
	FaInstagram,
	FaLinkedinIn,
	FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="bg-[#1a1d21] py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr,1fr,1fr] gap-8">
					{/* Logo and Description */}
					<div>
						<div className="flex items-center mb-2">
							<PiGraduationCap className="h-6 w-6 text-[#FF5722]" />
							<div className="ml-2 text-2xl font-semibold">
								<span className="text-white">Edu</span>
								<span className="text-[#FF5722]">Eden</span>
							</div>
						</div>
						<p className="text-gray-400 text-sm mb-8 max-w-md">
							Connecting learners with mentors worldwide to
							inspire growth and learning. Join us to gain skills
							or share your expertise.
						</p>
						<div className="flex space-x-6">

							<div className="group">
								<Link
									to="#"
									className="w-10 h-10 flex items-center justify-center bg-[#1e2125] text-white hover:bg-[#FF5722] 
                   group-hover:shadow-[0px_0px_10px_#FF5722] transition-shadow duration-300 ease-in-out">
									<FaInstagram size={18} />
								</Link>
							</div>
							<div className="group">
								<Link
									to="#"
									className="w-10 h-10 flex items-center justify-center bg-[#1e2125] text-white hover:bg-[#FF5722] 
                   group-hover:shadow-[0px_0px_10px_#FF5722] transition-shadow duration-300 ease-in-out">
								<FaYoutube size={18} />
								</Link>
							</div>
							<div className="group">
								<Link
									to="#"
									className="w-10 h-10 flex items-center justify-center bg-[#1e2125] text-white hover:bg-[#FF5722] 
                   group-hover:shadow-[0px_0px_10px_#FF5722] transition-shadow duration-300 ease-in-out">
								<FaLinkedinIn size={18} />
								</Link>
							</div>
						</div>
					</div>

					{/* Top 4 Category */}
					<div>
						<h3 className="text-white text-sm font-medium mb-6 uppercase">
							TOP 4 CATEGORY
						</h3>
						<ul className="space-y-4">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors">
									{" "}
									Web Development
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors">
									{" "}
									Machine Learning
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors">
									{" "}
									Mobile Development
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors">
									Game Development
								</a>
							</li>
						</ul>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-white text-sm font-medium mb-6 uppercase">
							QUICK LINKS
						</h3>
						<ul className="space-y-4">
							<li>
								<Link
									to="/about-us"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors pb-1 inline-flex items-center">
									About
								</Link>
							</li>
							<li>
								<Link
									to="/become-instructor"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors pb-1 inline-flex items-center">
									Become Instructor
								</Link>
							</li>
							<li>
								<Link
									to="/contact-us"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors pb-1 inline-flex items-center">
									Contact
								</Link>
							</li>
							<li>
								<Link
									to="/career"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors pb-1 inline-flex items-center">
									Career
								</Link>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div>
						<h3 className="text-white text-sm font-medium mb-6 uppercase">
							SUPPORT
						</h3>
						<ul className="space-y-4">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors">
									Help Center
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors">
									FAQs
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors">
									Terms & Condition
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors">
									Privacy Policy
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Copyright */}
				<div className="mt-16 pt-8 border-t text-center border-gray-800">
					<p className="text-gray-400 text-sm">
						© 2024 - EduEden. All rights reserved
					</p>
				</div>
			</div>
		</footer>
	);
}
