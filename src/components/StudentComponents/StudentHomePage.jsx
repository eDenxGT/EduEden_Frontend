import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Star, Users, Code, Smartphone, Database, Palette, Network, Bot, Gamepad2, BookOpen, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { IoIosGitBranch } from "react-icons/io";
import { TbCertificate } from "react-icons/tb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import BrototypeLogo from "../../assets/images/landingPage/platforms/brototype_logo.png";
import OpenAi from "../../assets/images/landingPage/platforms/openai-removebg-preview.png";
import W3Schools from "../../assets/images/landingPage/platforms/w3-removebg-preview.png";
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
import { useNavigate } from 'react-router-dom';

export default function StudentHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleTheme: isDarkMode, studentData } = useSelector(
    (state) => state.student
  );
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats([
        { title: 'Courses in Progress', value: 3, icon: BookOpen, color: 'text-blue-500' },
        { title: 'Completed Courses', value: 2, icon: CheckCircle, color: 'text-green-500' },
        { title: 'Certificates Earned', value: 1, icon: TbCertificate, color: 'text-purple-500' },
        { title: 'Completed Quizzes', value: 5, icon: Award, color: 'text-yellow-500' },
      ]);
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-b from-gray-100 to-gray-200"
      }`}
    >
      <section
        className={`
        ${
          isDarkMode
            ? "bg-gray-800"
            : "bg-gradient-to-r from-[#FFEEE8] to-[#FFF6F0]"
        } py-12 shadow-md`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1
              className={`text-4xl font-bold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-800"
              } animate-fade-in`}
            >
              Welcome back, {studentData ? studentData?.full_name : "Student"}!
            </h1>
            <p
              className={`text-xl ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } animate-slide-up`}
            >
              Continue your learning journey
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src={studentData?.avatar ? studentData?.avatar : "https://thumbs.dreamstime.com/b/smiling-anime-chibi-cartoon-boy-working-computer-white-background-smiling-anime-chibi-cartoon-boy-working-computer-321914300.jpg"}
              alt="Student"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg animate-bounce"
            />
          </div>
        </div>
      </section>

      <section
        className={`container mt-12 border rounded-lg mx-auto xl:max-w-6xl px-4 py-12 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array(4).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-[100px] w-full" />
              ))
            : stats.map((stat, index) => (
                <Card
                  key={stat.title}
                  className={`p-6 ${
                    isDarkMode
                      ? `bg-${stat.color.split('-')[1]}-900`
                      : `bg-gradient-to-br from-${stat.color.split('-')[1]}-50 to-${stat.color.split('-')[1]}-100`
                  } hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-medium text-lg ${
                          isDarkMode
                            ? `text-${stat.color.split('-')[1]}-200`
                            : `text-${stat.color.split('-')[1]}-800`
                        }`}
                      >
                        {stat.title}
                      </h3>
                      <stat.icon
                        className={`h-8 w-8 ${
                          isDarkMode
                            ? `text-${stat.color.split('-')[1]}-300`
                            : stat.color
                        }`}
                      />
                    </div>
                    <p
                      className={`text-3xl font-bold mt-2 ${
                        isDarkMode ? `text-${stat.color.split('-')[1]}-100` : `text-${stat.color.split('-')[1]}-600`
                      }`}
                    >
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      <section
        className={`container border my-12 shadow-lg ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
        } xl:max-w-6xl mx-auto px-8 py-12 rounded-lg`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Browse Categories
          </h2>
          <Button
		  onClick={() => navigate("/student/courses")}
            variant="ghost"
            className={`${
              isDarkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-800"
            } transition-colors duration-300`}
          >
            See more
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className={`p-6 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : `${category.bgColor} hover:shadow-xl`
              } transition-all duration-300 cursor-pointer rounded-lg transform hover:-translate-y-1 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0 flex flex-col items-center text-center gap-4">
                <div
                  className={`${
                    isDarkMode ? "bg-gray-600" : "bg-white"
                  } shadow-md p-4 rounded-full`}
                >
                  {category.icon}
                </div>
                <div>
                  <h3
                    className={`font-semibold text-lg mb-1 ${
                      isDarkMode ? "text-white" : ""
                    }`}
                  >
                    {category.name}
                  </h3>
                  {/* <p
                    className={`text-sm ${
                      isDarkMode
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {category.count} Courses
                  </p> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        className={`${
          isDarkMode
            ? "bg-gray-900"
            : "bg-gradient-to-b from-[#e6ebf3] to-white"
        } py-16`}
      >
        <div className="container xl:max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2
              className={`text-3xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Recommended for You
            </h2>
            <Button
              variant="link"
              className={`${
                isDarkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-800"
              } transition-colors duration-300`}
            >
              See more
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course, index) => (
              <Card
                key={course.title}
                className={`overflow-hidden rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  alt={course.title}
                  className="aspect-video w-full object-cover"
                  src={course.image}
                />
                <CardContent className="p-6">
                  <h3
                    className={`font-bold text-xl mb-2 min-h-[3.5rem] ${
                      isDarkMode
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span
                      className={`text-lg font-medium ${
                        isDarkMode
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {course.rating}
                    </span>
                    <span
                      className={`${
                        isDarkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
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
                      }`}
                    >
                      {course.students} students
                    </span>
                  </div>
                  <Button
                    className={`w-full max-w-[200px] mx-auto ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gradient-to-r from-[#ff6b35] to-[#ff8c35] hover:from-[#ff8c35] hover:to-[#ff6b35]"
                    } text-white py-2 rounded-full transition-all duration-300`}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${
          isDarkMode
            ? "bg-gray-900"
            : "bg-gradient-to-b from-white to-[#FFEEE8]"
        } py-16`}
      >
        <div className="container mx-auto xl:max-w-6xl px-4">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDarkMode ? "text-white" : "text-gray-800"
            } animate-fade-in`}
          >
            Learning Resources
          </h2>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className="transition-all duration-300 hover:opacity-80 hover:scale-110 transform animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
    </div>
  );
}

const categories = [
  {
    name: "Web Development",
    count: "150",
    icon: <Code className="h-8 w-8 text-blue-600" />,
    bgColor: "bg-blue-50",
  },
  {
    name: "Mobile Development",
    count: "100",
    icon: <Smartphone className="h-8 w-8 text-green-600" />,
    bgColor: "bg-green-50",
  },
  {
    name: "Data Science",
    count: "120",
    icon: <Database className="h-8 w-8 text-purple-600" />,
    bgColor: "bg-purple-50",
  },
//   {
//     name: "UI Design",
//     count: "80",
//     icon: <Palette className="h-8 w-8 text-orange-600" />,
//     bgColor: "bg-orange-50",
//   },
  {
    name: "Game Development",
    count: "90",
    icon: <Gamepad2 className="h-8 w-8 text-red-600" />,
    bgColor: "bg-red-50",
  },
//   {
//     name: "Cyber Security",
//     count: "70",
//     icon: <Network className="h-8 w-8 text-indigo-600" />,
//     bgColor: "bg-indigo-50",
//   },
//   {
//     name: "Machine Learning",
//     count: "110",
//     icon: <Bot className="h-8 w-8 text-pink-600" />,
//     bgColor: "bg-pink-50",
//   },
//   {
//     name: "Git & Version Control",
//     count: "95",
//     icon: <IoIosGitBranch className="h-8 w-8 text-teal-600" />,
//     bgColor: "bg-teal-50",
//   },
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
    name: "W3Schools",
    logo: W3Schools,
    height: "h-14",
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

