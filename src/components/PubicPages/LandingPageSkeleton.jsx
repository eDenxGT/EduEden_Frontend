import React from "react";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import { SkeletonCard } from "../CommonComponents/Skeletons/PageSkeleton";
import Card from "../../components/CommonComponents/Card";
import Button from "../../components/CommonComponents/Button";

// Import placeholder image for the hero section
import BoyImage from "../../assets/images/landingPage/Boy1.avif";

import { useNavigate } from "react-router-dom";

export default function LandingPageSkeleton() {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.public.toggleTheme);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-b from-gray-50 to-gray-100"
      }`}
    >
      <main>
        {/* Hero Section */}
        <section
          className={`${
            isDarkMode
              ? "bg-gray-800"
              : "bg-gradient-to-r from-[#FFEEE8] to-[#FFF6F0]"
          }`}
        >
          <div className="container mx-auto px-4 py-12 md:py-0 flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-64px)]">
            <div className="md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
              <div className="flex-col space-y-4 md:space-y-6 justify-center items-start max-w-xl px-4">
                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  } leading-tight`}
                >
                  Master <span className="text-[#FF5722]">Code,</span>
                  <br />
                  Step by Step
                </h1>
                <p
                  className={`text-base sm:text-lg md:text-xl ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } max-w-md`}
                >
                  Skip the &#34;what should I learn next?&#34; confusion. Follow
                  our structured paths, build awesome projects, and get expert
                  help whenever you need it.
                </p>
                <Button
                  onClick={() => navigate("/student/signin")}
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
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
            <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} className="h-32" />
            ))}
          </div>
        </section>

        {/* Top Rated Courses Section */}
        <section
          className={`${isDarkMode ? "bg-gray-900" : "bg-white"} py-8 sm:py-16`}
        >
          <div className="container xl:max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
              <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden rounded-xl ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg animate-pulse`}
                >
                  <div className="aspect-video w-full h-48 sm:h-56 bg-gray-300"></div>
                  <div className="p-4 sm:p-6 space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Best Selling Courses Section */}
        <section className={`${isDarkMode ? "bg-gray-900" : "bg-white"} py-16`}>
          <div className="container xl:max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden rounded-xl ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg animate-pulse`}
                >
                  <div className="aspect-video w-full bg-gray-300"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Mentor Section */}
        <section
          className={`${
            isDarkMode
              ? "bg-gray-900"
              : "bg-gradient-to-r from-[#FFEEE8] to-[#FFF6F0]"
          } py-16`}
        >
          <div className="container mx-auto xl:max-w-6xl px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <Card
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } flex flex-col justify-evenly p-8 px-14 rounded-xl shadow-lg animate-pulse`}
              >
                <div className="space-y-4">
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-10 bg-gray-300 rounded w-1/2"></div>
                </div>
              </Card>
              <div className="space-y-8">
                <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="flex-grow space-y-2">
                      <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                      <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
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
          } py-16`}
        >
          <div className="container mx-auto xl:max-w-6xl px-4">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-12 animate-pulse"></div>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              {[...Array(7)].map((_, index) => (
                <div
                  key={index}
                  className="h-20 w-20 bg-gray-300 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
