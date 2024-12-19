import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  Users,
  Globe,
  Play,
  FileText,
  ChevronDown,
  User2Icon,
} from "lucide-react";
import Button from "@/components/CommonComponents/Button";
import Card from "@/components/CommonComponents/Card";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { CourseDetailsSkeleton } from "@/components/CommonComponents/Skeletons/CourseDetailsSkeleton";
import { getCourseDetailsByCourseId } from "@/api/backendCalls/course";
import CourseNotFound from "@/components/CommonComponents/CourseNotFound";

const PurchasedCourseDetails = () => {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { course_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [purchasedCourse, setPurchasedCourse] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const fetchCourseData = async () => {
    setIsLoading(true);
    try {
      const courseData = await getCourseDetailsByCourseId(
        course_id,
        "studentPurchasedCourse",
        "student"
      );
      setPurchasedCourse(courseData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [course_id]);

  const handleStartLecture = (lectureId) => {
    navigate(`/student/my-courses/${course_id}/lecture/${lectureId}`, {
      state: { lectureId },
    });
  };

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (!purchasedCourse) {
    return <CourseNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation link */}
        <RouterLink
          to="/student/my-courses"
          className="text-gray-500 hover:text-gray-900 mb-4"
        >
          <span>My Courses / </span>
        </RouterLink>
        <span className="text-gray-500 hover:text-gray-700 mb-4">
          {purchasedCourse.title}
        </span>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Course Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {purchasedCourse.title}
                </h1>
                <p className="text-gray-600 mb-4">
                  {purchasedCourse.course_description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {purchasedCourse.tutor_avatar ? (
                      <img
                        className="w-10 h-10 rounded-full border-2 border-white"
                        src={purchasedCourse.tutor_avatar}
                        alt="Instructor"
                      />
                    ) : (
                      <User2Icon size={18} />
                    )}
                    <div>
                      <p className="text-sm font-medium">Created by</p>
                      <p className="text-sm text-gray-500">
                        {purchasedCourse.tutor_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5  ${
                            i < purchasedCourse.average_rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className="font-semibold">
                      {purchasedCourse.average_rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({purchasedCourse.ratings_count} Ratings)
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Preview */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={purchasedCourse.course_thumbnail}
                  alt="Course preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    handleStartLecture(purchasedCourse.lectures[0].lecture_id)
                  }
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-4"
                >
                  <Play className="w-12 h-12 text-orange-600" />
                </button>
              </div>

              {/* Course Description */}
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600">
                  {purchasedCourse.course_description}
                </p>
              </div>

              {/* Lectures */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                <div className="space-y-4">
                  {purchasedCourse.lectures?.map((lecture, index) => (
                    <div key={index} className="border rounded-lg">
                      <button
                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
                        onClick={() => toggleAccordion(index)}
                      >
                        <span className="font-medium text-left">
                          {lecture.title}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            activeAccordion === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeAccordion === index && (
                        <div className="px-4 py-2 border-t">
                          <div className="py-2 flex items-center justify-between text-gray-600 hover:bg-gray-50">
                            <span>Duration: {lecture.duration}</span>
                            <Button
                              text={"Start"}
                              className={` py-2  rounded-none max-w-fit px-5 ${
                                lecture.completed
                                  ? "bg-green-500 text-white"
                                  : "bg-orange-500 text-white"
                              }`}
                              onClick={() =>
                                handleStartLecture(lecture.lecture_id)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[380px]">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Course Duration</p>
                      <p>{purchasedCourse.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FileText className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Course Level</p>
                      <p>{purchasedCourse.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Students Enrolled</p>
                      <p>{purchasedCourse.enrolled_count}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Globe className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Language</p>
                      <p>{purchasedCourse.language}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">This course includes:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <FileText className="w-5 h-5" />
                      <span>Free exercises file & downloadable resources</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <FileText className="w-5 h-5" />
                      <span>Shareable certificate of completion</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <Globe className="w-5 h-5" />
                      <span>Access on mobile, tablet and TV</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <Globe className="w-5 h-5" />
                      <span>100% online course</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedCourseDetails;
