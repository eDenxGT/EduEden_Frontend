import { useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Error404Page = () => {
  const [isDarkMode] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-800'}`}>

      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <img
          src="https://media2.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif"
          alt="404 Error Page"
          className="w-auto h-auto max-w-full max-h-[60vh] rounded-lg shadow-xl mb-8"
        />
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#FF5722]'}`}>
          Oops! Page Not Found
        </h1>
        <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button onClick={() => navigate(-1)}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${
            isDarkMode
              ? 'text-gray-900 bg-yellow-400 hover:bg-yellow-500'
              : 'text-white bg-[#FF5722] hover:bg-[#ff5622e3]'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
        >
          <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
          Go back home
        </Button>
      </div>
    </div>
  );
};

export default Error404Page;