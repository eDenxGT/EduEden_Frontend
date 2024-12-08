import { useState, useEffect } from "react";
import { debounce } from "lodash";
import CourseCard from "../../CommonComponents/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { deleteCourseById, fetchCourses } from "../../../store/thunks/courseThunks";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../utils/Modals/ConfirmtionModal";
import SelectInputField from "../../CommonComponents/SelectInputField";
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchCategories } from "../../../store/slices/categoriesSlice";

const CourseListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const { courses } = useSelector((state) => state.courses);
  const {categories} = useSelector(state=>state.categories)

  const isDarkMode = useSelector(state => state.admin.toggleTheme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const coursesPerPage = 4; 

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        await dispatch(fetchCourses()).unwrap();
      } catch (error) {
        console.error("Fetch Enrolled Courses error:", error);
        toast.error("Failed to load your courses. Please try again.");
      }
    };
    fetchAllCourses();
  }, [dispatch]);
  useEffect(() => {
    
    setFilteredCourses(courses);
  }, [courses])

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = debounce((query) => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, 300);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    // Implement sorting logic here
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    // Implement category filtering logic here
  };

  const onClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedCourseId(null);
  };

  const onConfirm = async () => {
    try {
      await dispatch(deleteCourseById(selectedCourseId)).unwrap();
      onClose();
      navigate('/admin/courses');
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.log("Delete Course By Id error : ", error);
      toast.error("Deleting course failed!");
    }
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = (searchQuery ? filteredCourses : courses).slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const primaryColor = isDarkMode
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-orange-500 hover:bg-orange-600";
  const secondaryColor = isDarkMode
    ? "bg-gray-700 hover:bg-gray-600"
    : "bg-gray-200 hover:bg-gray-300";

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search in your courses..."
              className={`w-full md:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <SelectInputField
              options={["latest", "oldest", "price-low-high", "price-high-low"]}
              value={sortBy}
              onChange={handleSortChange}
              placeholder="Sort By"
              isDarkMode={isDarkMode}
              className="w-full md:w-40"
            />
            <SelectInputField
              options={categories.map((category) => category.title)}
              value={category}
              onChange={handleCategoryChange}
              placeholder="Category"
              isDarkMode={isDarkMode}
              className="w-full md:w-40"
            />
            <SelectInputField
              options={["4-star", "3-star", "2-star", "1-star"]}
              value="4-star"
              onChange={() => {}}
              placeholder="Rating"
              isDarkMode={isDarkMode}
              className="w-full md:w-40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCourses.map((course) => (
            <CourseCard
              key={course.course_id}
              onClick={() => navigate(`/admin/courses/${course.course_id}`)}
              userRole="admin"
              course={course}
              deleteCourseById={(course_id) => {
                setIsDeleteModalOpen(true);
                setSelectedCourseId(course_id);
              }}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-1 rounded-full flex items-center ${secondaryColor} ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <ChevronLeft className="mr-2" /> Prev
          </button>
          {Array.from(
            { length: Math.ceil(courses.length / coursesPerPage) },
            (_, i) => {
              if (
                i === 0 ||
                i === Math.ceil(courses.length / coursesPerPage) - 1 ||
                (i >= currentPage - 2 && i <= currentPage)
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 w-8 h-8 rounded-full flex items-center justify-center ${
                      currentPage === i + 1
                        ? primaryColor + " text-white"
                        : secondaryColor + (isDarkMode ? " text-white" : " text-gray-800")
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              } else if (i === currentPage - 3 || i === currentPage + 1) {
                return (
                  <span key={i} className="mx-1">
                    ...
                  </span>
                );
              }
              return null;
            }
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(courses.length / coursesPerPage)}
            className={`mx-1 px-3 py-1 rounded-full flex items-center ${secondaryColor} ${
              currentPage === Math.ceil(courses.length / coursesPerPage)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Next <ChevronRight className="ml-2" />
          </button>
        </div>
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

export default CourseListing;

