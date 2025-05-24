import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search, BookOpen, RefreshCw } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CourseCard from "../../CommonComponents/CourseCard";
import { CourseCardSkeleton } from "@/components/CommonComponents/Skeletons/CourseCardSkeleton";
import { deleteCourseById, getCoursesByTutorId } from "@/api/backendCalls/course";
import { getAllCategories } from "@/api/backendCalls/category";
import ConfirmationModal from "../../../utils/Modals/ConfirmtionModal";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const TutorMyCourses = () => {
  const navigate = useNavigate();
  const { toggleTheme: isDarkMode, tutorData } = useSelector(
    (state) => state.tutor
  );
  const { user_id } = tutorData;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [category, setCategory] = useState("all");
  const [listingStatus, setListingStatus] = useState("all");
  const [categories, setCategories] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const fetchCourses = async ({ pageParam = 1 }) => {
    const response = await getCoursesByTutorId({
      tutor_id: user_id,
      search: searchTerm,
      sort: sortBy,
      category: category,
      listing_status: listingStatus,
      page: pageParam,
      limit: 12,
    });
    return response;
  };

  const fetchCategories = useCallback(async () => {
    try {
      const fetchedCategories = await getAllCategories("forFiltering");
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const { data, fetchNextPage, hasNextPage, isFetching, isError, refetch } =
    useInfiniteQuery({
      queryKey: ["tutorCourses", searchTerm, sortBy, category, listingStatus],
      queryFn: fetchCourses,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.courses?.length < 12) return undefined;
        return pages?.length + 1;
      },
    });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleListingStatusChange = (value) => {
    setListingStatus(value);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSortBy("default");
    setCategory("all");
    setListingStatus("all");
    refetch();
  };

  const onDeleteCourse = (course_id) => {
    setIsDeleteModalOpen(true);
    setSelectedCourseId(course_id);
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCourseId(null);
  };

  const onConfirmDelete = async () => {
    try {
      await deleteCourseById(selectedCourseId);
      onCloseDeleteModal();
      refetch();
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.log("Delete Course By Id error : ", error);
      toast.error("Deleting course failed!");
    }
  };

  const courses = data?.pages.flatMap((page) => page.courses) || [];
  const totalCourses = data?.pages[0]?.total_courses || 0;

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6" />
            <span>{totalCourses} Courses</span>
          </div>
        </div>
      </div>
rrrrrrreeeeeee
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search in your courses..."
              value={searchTerm}
              onChange={handleSearch}
              className={`pl-10 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className={`shrink-0 ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger
              className={
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }
            >
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="date_newest">Date: Newest</SelectItem>
              <SelectItem value="date_oldest">Date: Oldest</SelectItem>
              <SelectItem value="title_asc">Title: A-Z</SelectItem>
              <SelectItem value="title_desc">Title: Z-A</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger
              className={
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem
                  key={category?.category_id}
                  value={category?.category_id}
                >
                  {category?.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={listingStatus}
            onValueChange={handleListingStatusChange}
          >
            <SelectTrigger
              className={
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }
            >
              <SelectValue placeholder="Listing Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="listed">Listed</SelectItem>
              <SelectItem value="unlisted">Unlisted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-8 text-red-500">
          Error loading courses
        </div>
      ) : (
        <InfiniteScroll
          dataLength={courses.length}
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
            {courses?.map((course) => (
              <CourseCard
                key={course?.course_id}
                course={course}
                userRole="tutor"
                isDarkMode={isDarkMode}
                onClick={() =>
                  navigate(`/tutor/my-courses/${course?.course_id}`)
                }
                deleteCourseById={onDeleteCourse}
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

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        onConfirm={onConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
        title={"Delete Course"}
        icon="danger"
        description="Are you sure you want to delete this course?"
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default TutorMyCourses;
