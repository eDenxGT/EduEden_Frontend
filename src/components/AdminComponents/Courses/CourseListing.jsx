import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, RefreshCw } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import CourseCard from "../../CommonComponents/CourseCard";
import ConfirmationModal from "../../../utils/Modals/ConfirmtionModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAllCoursesForAdminSide,
  deleteCourseById,
  updateCourseStatus,
} from "@/api/backendCalls/course";
import { getAllCategories } from "@/api/backendCalls/category";
import { CourseCardSkeleton } from "@/components/CommonComponents/Skeletons/CourseCardSkeleton";

const AdminCourseListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const navigate = useNavigate();

  const fetchCourses = async ({ pageParam = 1 }) => {
    const response = await getAllCoursesForAdminSide({
      search: searchQuery,
      sort: sortBy,
      category: category,
      page: pageParam,
      limit: 4,
    });
    return response;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isError, refetch } =
    useInfiniteQuery({
      queryKey: ["adminCourses", searchQuery, sortBy, category],
      queryFn: fetchCourses,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.length < 4) return undefined;
        return pages?.length + 1;
      },
    });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const courses = data ? data?.pages?.flatMap((page) => page) : [];
  console.log(courses, data);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSortBy("latest");
    setCategory("all");
    refetch();
  };

  const onClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedCourseId(null);
  };

  const handleCourseStatus = async (course_id) => {
    try {
      console.log(course_id);
      await updateCourseStatus(course_id);
      refetch();
    } catch (error) {
      console.log("Update Course Status error : ", error);
    }
  };

  const onConfirm = async () => {
    try {
      await deleteCourseById(selectedCourseId);
      onClose();
      refetch();
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.log("Delete Course By Id error : ", error);
      toast.error("Deleting course failed!");
    }
  };

  const isDarkMode = false;

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-auto">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search in your courses..."
              className="w-full md:w-64 pl-10"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="price_low_to_high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price_high_to_low">
                  Price: High to Low
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleResetFilters}
              variant="outline"
              className="w-full md:w-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>

        {isFetching && courses.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(9)].map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Error loading courses
          </div>
        ) : (
          <InfiniteScroll
            dataLength={courses?.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {[...Array(4)].map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            }
            endMessage={
              courses.length > 0 && (
                <div className="text-center py-4 text-gray-500">
                  No more courses to load
                </div>
              )
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.isArray(courses) &&
                courses?.map((course) => (
                  <CourseCard
                    key={course?.course_id}
                    onClick={() =>
                      navigate(`/admin/courses/${course?.course_id}`)
                    }
                    userRole="admin"
                    course={course}
                    deleteCourseById={(course_id) => {
                      setIsDeleteModalOpen(true);
                      setSelectedCourseId(course_id);
                    }}
                    isDarkMode={isDarkMode}
                    handleCourseStatus={handleCourseStatus}
                  />
                ))}
            </div>
          </InfiniteScroll>
        )}

        {courses.length === 0 && !isFetching && (
          <div className="text-center py-8 text-gray-600">
            <p className="text-xl font-semibold mb-2">No courses found</p>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </main>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        confirmText="Delete"
        cancelText="Cancel"
        title="Delete Course"
        icon="danger"
        description="Are you sure you want to delete this course?"
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default AdminCourseListing;
