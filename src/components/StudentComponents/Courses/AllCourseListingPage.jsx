import { useState, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import CourseCard from '../../CommonComponents/CourseCard';
import SelectInputField from '../../CommonComponents/SelectInputField';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchEnrolledCourses } from '../../../store/thunks/studentThunks';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { fetchListedCourses } from '../../../store/thunks/courseThunks';

const AllCourseListingPage = () => {
  const isDarkMode = useSelector((state) => state.student.toggleTheme);
  const {courses}  = useSelector((state) => state.courses);
  const { user_id } = useSelector((state) => state.student.studentData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState('Default');
  const [category, setCategory] = useState('All Category');
  const [progress, setProgress] = useState('All Progress');
  const [searchTerm, setSearchTerm] = useState('');

  const sortOptions = [
    'Date: Newest',
    'Date: Oldest',
    'Title: A-Z',
    'Title: Z-A',
    'Progress: High to Low',
    'Progress: Low to High',
  ];
  const categoryOptions = [
    'All Category',
    'DEVELOPMENT',
    'BEGINNERS',
    'BEGINNING',
  ];
  const progressOptions = [
    'All Progress',
    'Not Started',
    'In Progress',
    'Completed',
  ];

  useEffect(() => {
   const fetchAllCourses = async () => {
      try {
         await dispatch(fetchListedCourses()).unwrap();
      } catch (error) {
         console.error('Fetch Enrolled Courses error:', error);
         toast.error('Failed to load your courses. Please try again.');
      }
   }
   fetchAllCourses();
  }, [dispatch, user_id]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All Category' || course.category === category;
    const matchesProgress = progress === 'All Progress' || course.progress === progress;
    return matchesSearch && matchesCategory && matchesProgress;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'Date: Newest':
        return new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
      case 'Date: Oldest':
        return new Date(a.enrollmentDate) - new Date(b.enrollmentDate);
      case 'Title: A-Z':
        return a.title.localeCompare(b.title);
      case 'Title: Z-A':
        return b.title.localeCompare(a.title);
      case 'Progress: High to Low':
        return b.progressPercentage - a.progressPercentage;
      case 'Progress: Low to High':
        return a.progressPercentage - b.progressPercentage;
      default:
        return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">All Courses</h1>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6" />
            <span>{courses.length} Courses</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 mb-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search in your courses..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className={`absolute left-3 top-2.5 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectInputField
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort By"
              isDarkMode={isDarkMode}
              className="w-full"
            />
            <SelectInputField
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              placeholder="All Category"
              isDarkMode={isDarkMode}
              className="w-full"
            />
            <SelectInputField
              options={progressOptions}
              value={progress}
              onChange={setProgress}
              placeholder="All Progress"
              isDarkMode={isDarkMode}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              isDarkMode={isDarkMode}
              userRole={"student"}
              onClick={() => navigate(`/student/courses/${course.course_id}`)}
              showProgress={true}
            />
          ))}
        </div>

        {currentCourses.length === 0 && (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-xl font-semibold mb-2">No courses found</p>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

        {sortedCourses.length > itemsPerPage && (
          <div className="flex items-center justify-center mt-8 gap-2">
            {Array.from(
              { length: Math.ceil(sortedCourses.length / itemsPerPage) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  page === currentPage
                    ? 'bg-orange-500 text-white'
                    : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourseListingPage;

