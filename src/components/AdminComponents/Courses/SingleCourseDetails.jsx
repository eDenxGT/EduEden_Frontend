import React, { useEffect, useState } from "react";
import { Clock, Users, FileText, Globe, Star, MoreVertical, Calendar, BookOpen, Clock3, ChevronLeft, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchCoursesByCourseId, deleteCourseById, handleCourseStatus } from "@/store/thunks/courseThunks";
import moment from "moment";
import { toast } from "react-toastify";
import Button from "@/components/CommonComponents/Button";
import Card from "@/components/CommonComponents/Card";
import ConfirmationModal from "../../../utils/Modals/ConfirmtionModal";
import LoadingUi from "../../../utils/Modals/LoadingUi";
import StatCard from "@/components/CommonComponents/StatCard"

const SingleCourseDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.admin.toggleTheme);
  const { course } = useSelector((state) => state.courses);
  const { course_id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchCoursesByCourseId(course_id)).unwrap();
      } catch (error) {
        console.error("Fetch Course Details error:", error);
        toast.error("Failed to load course details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [dispatch, course_id]);

  const handleDeleteCourse = async () => {
    try {
      await dispatch(deleteCourseById(course_id)).unwrap();
      toast.success("Course deleted successfully");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Delete Course error:", error);
      toast.error("Failed to delete course. Please try again.");
    }
  };

  const handleToggleVisibility = async () => {
    try {
      await dispatch(handleCourseStatus(course_id)).unwrap();
      toast.success(`Course ${course.is_visible ? "hidden" : "visible"} successfully`);
    } catch (error) {
      console.error("Toggle Course Visibility error:", error);
      toast.error("Failed to update course visibility. Please try again.");
    }
  };

  if (isLoading) {
    return <LoadingUi text="Loading course details..." />;
  }

  if (!course) {
    return <div className="flex justify-center items-center h-screen">Course not found</div>;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 mb-6 text-sm">
          <Link to="/admin/courses" className={`flex items-center ${isDarkMode ? " text-gray-400 hover:text-gray-200" : " text-gray-400 hover:text-gray-700"}`}>
            <span>Courses</span>
          </Link>
          <span className="text-gray-500">/</span>
          <span>{course.title}</span>
        </nav>

        {/* Main Content */}
        <Card className={`p-6 mb-8 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={course.course_thumbnail}
                alt={course.title}
                className="w-full rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                  <p className="text-gray-500 mb-4">{course.course_description}</p>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={course.tutor_avatar}
                      alt={course.tutor_name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Instructor</p>
                      <p className="text-sm text-gray-500">{course.tutor_name}</p>
                    </div>
                  </div>
                </div>
                <div className={`text-sm  mt-4 flex justify-center mr-3  text-blue-500`}>
                  <span className="font-semibold font-poppins ">{(course.category ?? course.category_id.title).toUpperCase()}</span>
                </div>
                {/* <div className="flex space-x-2">
                  <Button
                    text="Edit"
                    onClick={() => navigate(`/admin/courses/edit/${course_id}`)}
                    className="bg-blue-500 text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                  </Button>
                  <Button
                    text="Delete"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="bg-red-500 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                  </Button>
                  <Button
                    text={course.is_visible ? "Hide" : "Show"}
                    onClick={handleToggleVisibility}
                    className={course.is_visible ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}
                  >
                    {course.is_visible ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  </Button>
                </div> */}
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p>{moment(course.created_at).format("MMM DD, YYYY")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p>{moment(course.updated_at).format("MMM DD, YYYY")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-xl font-bold text-orange-500">₹{course.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visibility</p>
                  <p className={course.is_visible ? "text-green-500" : "text-red-500"}>
                    {course.is_visible ? "Un Listed " : "Listed"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<BookOpen className="w-6 h-6 text-blue-500" />}
            title="Lectures"
            value={course.lectures?.length || 0}
            isDarkMode={isDarkMode}
          />
          <StatCard
            icon={<Star className="w-6 h-6 text-yellow-500" />}
            title="Average Rating"
            value={(course.average_rating).toFixed(1) || 0}
            subtitle={`(${course.ratings_count || 0} ratings)`}
            isDarkMode={isDarkMode}
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-green-500" />}
            title="Students Enrolled"
            value={course.enrolled_count || 0}
            isDarkMode={isDarkMode}
          />
          <StatCard
            icon={<FileText className="w-6 h-6 text-purple-500" />}
            title="Course Level"
            value={course.level}
            isDarkMode={isDarkMode}
          />
          <StatCard
            icon={<Globe className="w-6 h-6 text-indigo-500" />}
            title="Language"
            value={course.language}
            isDarkMode={isDarkMode}
          />
          <StatCard
            icon={<Clock3 className="w-6 h-6 text-pink-500" />}
            title="Duration"
            value={course.duration || "N/A"}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Lessons Preview */}
        <Card className={`p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          <div className="space-y-4">
            {course.lectures && course.lectures.map((lesson, index) => (
              <div key={index} className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{lesson.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Created on {moment(lesson.created_at).format("MMM DD, YYYY")}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCourse}
        title="Delete Course"
        description="Are you sure you want to delete this course? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDarkMode={isDarkMode}
        icon="danger"
      />
    </div>
  );
};

export default SingleCourseDetails;

