import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "sonner";
import {
  BookOpen,
  Calendar,
  Clock,
  Edit,
  Eye,
  EyeOff,
  FileText,
  Globe,
  MoreVertical,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationModal from "../../../utils/Modals/ConfirmtionModal";
import { StatCard } from "@/components/CommonComponents/CourseDetailsStatCard";
import { CourseDetailsSkeleton } from "@/components/CommonComponents/Skeletons/CourseDetailsSkeleton";
import {
  deleteCourseById,
  getCourseDetailsByCourseId,
  updateCourseStatus,
} from "@/api/backendCalls/course";

const SingleCourseDetails = () => {
  const navigate = useNavigate();
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      setIsLoading(true);
      try {
        const courseData = await getCourseDetailsByCourseId(
          course_id,
          "adminSingleCourse",
          "admin"
        );
        setCourse(courseData);
      } catch (error) {
        console.error("Fetch Course Details error:", error);
        toast.error("Failed to load course details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [course_id]);

  const handleDeleteCourse = async () => {
    try {
      await deleteCourseById(course_id);
      toast.success("Course deleted successfully");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Delete Course error:", error);
      toast.error("Failed to delete course. Please try again.");
    }
  };

  const handleToggleVisibility = async () => {
    try {
      const updatedCourse = await updateCourseStatus(course_id);
      setCourse((prev) => ({
        ...prev,
        is_listed: !prev.is_listed,
      }));
      toast.success(
        `Course ${updatedCourse.is_listed ? "Listed" : "Unlisted"} successfully`
      );
    } catch (error) {
      console.error("Toggle Course Visibility error:", error);
      toast.error("Failed to update course visibility. Please try again.");
    }
  };

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        Course not found
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                to="/admin/courses"
                className="hover:underline text-[#ff5722]"
              >
                Courses
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>{course.title}</li>
          </ol>
        </nav>

        {/* Main Content */}
        <Card className={`mb-8 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <img
                  src={course.course_thumbnail}
                  alt={course.title}
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
              <div className="lg:w-2/3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">
                      Uploaded:{" "}
                      {moment(course.created_at).format("MMM DD, YYYY")} • Last
                      Updated:{" "}
                      {moment(course.updated_at).format("MMM DD, YYYY")}
                    </p>
                    <h1 className="text-3xl font-bold mt-2 mb-4">
                      {course.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {course.course_description}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={course.tutor_avatar}
                        alt={course.tutor_name}
                        className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                      />
                      <div>
                        <p className="text-sm font-medium">Instructor</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {course.tutor_name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* <DropdownMenuItem
                        onClick={() =>
                          navigate(`/admin/courses/edit/${course_id}`)
                        }
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Course
                      </DropdownMenuItem> */}
                      <DropdownMenuItem
                        onClick={() => setIsDeleteModalOpen(true)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleToggleVisibility}>
                        {course.is_listed ? (
                          <EyeOff className="w-4 h-4 mr-2" />
                        ) : (
                          <Eye className="w-4 h-4 mr-2" />
                        )}
                        {course.is_listed ? "Unlist Course" : "List Course"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">
                      {course.average_rating.toFixed(1)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      ({course.ratings_count} Ratings)
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Course price
                    </p>
                    <p className="text-xl font-bold">
                      ₹{course.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Badge
                    className={
                      course.is_listed
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {course.is_listed ? "Listed" : "Unlisted"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            title="Lectures"
            value={course.lectures?.length || 0}
          />
          <StatCard
            icon={Star}
            title="Average Rating"
            value={course.average_rating.toFixed(1)}
            subtitle={`(${course.ratings_count} ratings)`}
          />
          <StatCard
            icon={Users}
            title="Students Enrolled"
            value={course.enrolled_count || 0}
          />
          <StatCard icon={FileText} title="Course Level" value={course.level} />
          <StatCard icon={Globe} title="Language" value={course.language} />
          <StatCard
            icon={Clock}
            title="Duration"
            value={course.duration || "N/A"}
          />
        </div>

        {/* Lessons Preview */}
        <div className="space-y-6">
          {course.lectures?.map((lesson, index) => (
            <Card
              key={index}
              className={isDarkMode ? "bg-gray-800" : "bg-white"}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 relative bg-gray-200 dark:bg-gray-700">
                    <img
                      src={lesson.video_thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover aspect-video"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-2xl font-bold mb-4">{lesson.title}</h3>
                    <div className="flex flex-wrap gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Date:{" "}
                          {moment(lesson.created_at).format("MMM DD, YYYY")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Duration: {lesson.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
