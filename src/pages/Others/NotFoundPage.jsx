import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-7xl font-light text-gray-200">Error 404</h1>
            <h2 className="text-3xl font-bold text-gray-900">
              Oops! page not found
            </h2>
            <p className="text-gray-600 max-w-md">
              Something went wrong. It&apos;s look that your requested could not
              be found. It&apos;s look like the link is broken or the page is
              removed.
            </p>
            <Button
              onClick={() => navigate(-1)}
              className="bg-[#FF5733] hover:bg-[#FF5733]/90 text-white px-8 rounded"
            >
              Go Back
            </Button>
          </div>

          {/* Right Content */}
          <div className=" flex justify-center items-center ">
            <img
              src="/Error404.png"
              alt="404 illustration with character"
              className="w-full max-w-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

