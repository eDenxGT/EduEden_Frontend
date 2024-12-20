/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleCourseStatus } from "../../store/thunks/courseThunks";

const CourseCard = ({
  course,
  userRole,
  isDarkMode = false,
  onClick,
  deleteCourseById,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const moreButtonRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuOptions = {
    student: [
      {
        label: "View Details",
        action: () => navigate(`/student/courses/${course.course_id}`),
      },
    ],
    tutor: [
      {
        label: "View Details",
        action: () => navigate(`/tutor/my-courses/${course.course_id}`),
      },
      {
        label: "Edit Course",
        action: () => navigate(`/tutor/my-courses/edit/${course.course_id}`),
      },
      {
        label: "Delete Course",
        action: () => deleteCourseById(course?.course_id),
      },
    ],
    admin: [
      {
        label: "View Details",
        action: () => navigate(`/admin/courses/${course.course_id}`),
      },
      // {
      // 	label: "Edit Course",
      // 	action: () => navigate(`/admin/courses/edit/${course.course_id}`),
      // },
      {
        label: "Delete Course",
        action: () => deleteCourseById(course?.course_id),
      },
      {
        label: course?.is_listed ? "Unlist Course" : "List Course",
        action: () => {
          dispatch(handleCourseStatus(course?.course_id));
        },
      },
    ],
  };

  const onCardClick = (e) => {
    if (
      dropdownRef.current?.contains(e.target) ||
      moreButtonRef.current?.contains(e.target)
    ) {
      return;
    }
    onClick?.(course.course_id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !moreButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={onCardClick}
      className={`flex flex-col shadow-md rounded-none ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="relative h-48">
        <img
          src={course?.course_thumbnail}
          alt={course?.title}
          className="w-full h-full object-cover"
        />
        {(userRole === "tutor" || userRole === "admin") && (
          <div
            className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
              course?.is_listed
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {course?.is_listed ? "Listed" : "Unlisted"}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2 ">
          <div
            className={`text-xs font-semibold uppercase  ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {course?.category ?? course?.category_id?.title}
          </div>
          <div className="text-sm text-[#FF5722] font-bold">
            ₹ {course?.price?.toFixed(2)}
          </div>
        </div>
        <h3
          className={`text-sm font-medium leading-snug mb-2 flex-grow ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {course?.title}
        </h3>
        {/* <hr className="mb-3 mt-1"/> */}
        <div className="flex items-center  justify-between text-xs mb-2">
          <div className="flex items-center">
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span
                className={`ml-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {(course?.average_rating === 0
                  ? 0
                  : course?.average_rating.toFixed(1)) ?? 0}
              </span>
            </div>
            <div className="flex items-center ml-2">
              <User className="w-3 h-3 text-[#564FFD]" />
              <span
                className={`ml-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {course?.enrolled_count} students
              </span>
            </div>
          </div>
          <div className="relative">
            <button
              className={`rounded-full p-1 ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
              onClick={() => setShowDropdown(!showDropdown)}
              ref={moreButtonRef}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showDropdown && (
              <div
                ref={dropdownRef}
                className={`absolute right-0 mt-2 w-32 rounded-none shadow-lg z-10 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                {menuOptions[userRole]?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.action();
                      setShowDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      isDarkMode
                        ? "text-gray-200 hover:bg-gray-600 hover:text-white"
                        : "text-gray-700 hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    {option?.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
