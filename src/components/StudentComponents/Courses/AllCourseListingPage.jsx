import { useState, useEffect, useCallback } from "react";
import { Search, BookOpen, RefreshCw } from "lucide-react";
import CourseCard from "../../CommonComponents/CourseCard";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getListedCourses } from "@/api/backendCalls/course";
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
import { Skeleton } from "@/components/ui/skeleton";
import { getAllTutorsForStudents } from "@/api/backendCalls/student";
import { getAllCategories } from "@/api/backendCalls/category";
import { CourseCardSkeleton } from "@/components/CommonComponents/CourseCardSkeleton";

const AllCourseListingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [category, setCategory] = useState("all");
  const [tutor, setTutor] = useState("all");
  const [categories, setCategories] = useState([]);
  const [tutors, setTutors] = useState([]);

  const fetchCourses = async ({ pageParam = 1 }) => {
    const response = await getListedCourses({
      search: searchTerm,
      sort: sortBy,
      category: category,
      page: pageParam,
      limit: 12,
      tutor: tutor,
    });
    return response;
  };

  const fetchItemsForFiltering = useCallback(async () => {
    try {
      const tutors = await getAllTutorsForStudents("forFiltering");
      const categories = await getAllCategories("forFiltering");
      setTutors(tutors);
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching items for filtering:", error);
    }
  }, []);

  useEffect(() => {
    fetchItemsForFiltering();
  }, [fetchItemsForFiltering]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["listedCourses", searchTerm, sortBy, category, tutor],
    queryFn: fetchCourses,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 12) return undefined;
      return pages.length + 1;
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

  const handleTutorChange = (value) => {
    setTutor(value);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSortBy("default");
    setCategory("all");
    setTutor("all");
    refetch();
  };

  const courses = data ? data?.pages?.flatMap((page) => page) : [];
  courses.map((course) => {
    course.category =
      categories.find((category) => category.category_id === course.category_id)
        ?.title || null;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">All Courses</h1>
        {/* <div className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6" />
          <span>{totalCourses} Courses</span>
        </div> */}
      </div>

      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search in your courses..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="self-start"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="date_newest">Date: Newest</SelectItem>
              <SelectItem value="date_oldest">Date: Oldest</SelectItem>
              <SelectItem value="title_asc">Title: A-Z</SelectItem>
              <SelectItem value="title_desc">Title: Z-A</SelectItem>
              <SelectItem value="price_low_to_high">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price_high_to_low">
                Price: High to Low
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
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

          <Select value={tutor} onValueChange={handleTutorChange}>
            <SelectTrigger>
              <SelectValue placeholder="Tutor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tutors</SelectItem>
              {tutors?.map((tutor) => (
                <SelectItem key={tutor?.user_id} value={tutor?.user_id}>
                  {tutor?.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  course={course}
                  onClick={() =>
                    navigate(`/student/courses/${course?.course_id}`)
                  }
                  showProgress={true}
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
    </div>
  );
};

export default AllCourseListingPage;
