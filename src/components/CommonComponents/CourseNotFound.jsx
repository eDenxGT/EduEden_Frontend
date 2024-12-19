import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import courseNotFoundAnimation from "@/assets/animations/CourseNotFound.json";

const CourseNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Lottie
          animationData={courseNotFoundAnimation}
          loop={true}
          className="w-64 h-64 mx-auto mb-8"
          aria-label="Animation showing a course not found"
        />
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Course Not Found
        </h1>
        <p className="text-center text-gray-600 mb-8">
          We&apos;re sorry, but the course you&apos;re looking for is not
          available for you or doesn&apos;t exist.
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/student/my-courses")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Browse Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseNotFound;
