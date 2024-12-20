import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { CourseDetailsSkeleton } from "@/components/CommonComponents/Skeletons/CourseDetailsSkeleton";
import { getCourseDetailsByCourseId } from "@/api/backendCalls/course";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Calendar, Clock, FileText, Globe, MoreVertical, Star, Users } from 'lucide-react';
import { StatCard } from "@/components/CommonComponents/CourseDetailsStatCard";

const CourseDetails = () => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.tutor.toggleTheme);
  const { course_id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const course = await getCourseDetailsByCourseId(
          course_id,
          "tutorCourseDetails",
          "tutor"
        );
        setCourseData(course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [course_id]);

  if (loading) {
    return <CourseDetailsSkeleton />;
  }

  const price = courseData?.price || 0;

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/tutor/my-courses" className="hover:underline text-[#ff5722]">
                My Courses
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>{courseData?.title}</li>
          </ol>
        </nav>

        {/* Main Content */}
        <Card className={`mb-8 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <img
                  src={courseData?.course_thumbnail}
                  alt={courseData?.title}
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
              <div className="lg:w-2/3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">
                      Uploaded: {moment(courseData?.created_at).format("MMM DD, YYYY")} •
                      Last Updated: {moment(courseData?.updated_at).format("MMM DD, YYYY")}
                    </p>
                    <h1 className="text-3xl font-bold mt-2 mb-4">{courseData?.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{courseData?.course_description}</p>

                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={courseData?.tutor_avatar}
                        alt={courseData?.tutor_name}
                        className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                      />
                      <div>
                        <p className="text-sm font-medium">Created by:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{courseData?.tutor_name}</p>
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
                      <DropdownMenuItem onClick={() => navigate(`/tutor/my-courses/edit/${course_id}`)}>
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {/* Implement delete functionality */}}>
                        Delete Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">{courseData?.average_rating || 0}</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      ({courseData?.ratings_count || 0} Ratings)
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Course price</p>
                      <p className="text-xl font-bold">${price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total revenue</p>
                      <p className="text-xl font-bold">
                        ${((courseData?.enrolled_count || 0) * price).toFixed(2)}
                      </p>
                    </div>
                    <Button onClick={() => navigate("/tutor/earnings")} className="bg-[#ff5722] hover:bg-[#e64a19] text-white">
                      Withdraw
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <Badge
                    className={courseData?.is_listed ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                  >
                    {courseData?.is_listed ? "Listed" : "Unlisted"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard icon={BookOpen} title="Lectures" value={courseData?.lectures?.length || 0} />
          <StatCard icon={Star} title="Total Ratings" value={courseData?.ratings_count || 0} />
          <StatCard icon={Users} title="Students enrolled" value={courseData?.enrolled_count || 0} />
          <StatCard icon={FileText} title="Course level" value={courseData?.level || "N/A"} />
          <StatCard icon={Globe} title="Course Language" value={courseData?.language || "N/A"} />
          <StatCard icon={Clock} title="Course Duration" value={courseData?.duration || "N/A"} />
        </div>

        {/* Lessons Preview */}
        <div className="space-y-6">
          {courseData?.lectures?.map((lesson, index) => (
            <Card key={index} className={isDarkMode ? "bg-gray-800" : "bg-white"}>
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
                          Date: {moment(lesson?.created_at).format("MMM DD, YYYY")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Duration: {lesson.duration}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate(`/tutor/my-courses/${courseData.course_id}/lectures/${lesson?.lecture_id}`)}
                      className="bg-[#ff5722] hover:bg-[#e64a19] text-white"
                    >
                      View Lecture
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

