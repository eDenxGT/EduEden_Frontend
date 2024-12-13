import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../api/axiosConfig";
import { toast } from "sonner";
import { debounce } from "lodash";
import { UserCircle, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const StudentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentsPerPage] = useState(5);
  const [state, setState] = useState({
    students: [],
    filteredStudents: [],
  });
  const [isPageChanging, setIsPageChanging] = useState(false);

  const isDarkMode = useSelector((state) => state.admin.toggleTheme);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance("/admin/get-students");
        if (response.status === 200) {
          setState({
            students: response.data.students,
            filteredStudents: response.data.students,
          });
        }
      } catch (error) {
        console.log("Students fetching error Admin side:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = debounce(async (query) => {
    try {
      if (!query) {
        setState((prevState) => ({
          ...prevState,
          filteredStudents: prevState.students,
        }));
        return;
      }
      const response = await axiosInstance.get(
        `/admin/search-students?query=${query}`
      );
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          filteredStudents: response.data.students,
        }));
      }
    } catch (error) {
      console.log("Search Students Error: ", error);
      toast.error(error?.response?.data?.message);
    }
  }, 1000);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents =
    Array.isArray(state.filteredStudents) && state.filteredStudents.length > 0
      ? state.filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
      : [];

  const totalPages = Math.ceil(state.filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setIsPageChanging(true);
      setCurrentPage(pageNumber);
      setTimeout(() => setIsPageChanging(false), 300);
    }
  };

  const toggleStudentStatus = async (studentId) => {
    try {
      const response = await axiosInstance.post(
        "/admin/toggle-student-status",
        { studentId }
      );
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          students: prevState.students.map((student) =>
            student.user_id === studentId
              ? { ...student, is_blocked: !student.is_blocked }
              : student
          ),
          filteredStudents: prevState.filteredStudents.map((student) =>
            student.user_id === studentId
              ? { ...student, is_blocked: !student.is_blocked }
              : student
          ),
        }));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Toggle Student Status Error: ", error);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Student Management</h1>
        <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6`}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className={`${
                isDarkMode
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-200 text-gray-800 placeholder-gray-500"
              } transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  {/* <TableHead>Phone Verified</TableHead>*/}
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody
                className={`transition-opacity duration-300 ${
                  isPageChanging ? "opacity-0" : "opacity-100"
                }`}
              >
                {currentStudents.map((student) => (
                  <TableRow
                    key={student.user_id}
                    className="transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {student.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
                              src={student.avatar}
                              alt=""
                            />
                          ) : (
                            <UserCircle className="w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-110" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">
                            {student.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            UID: {student?.user_id || "UID Not Found"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="mr-2" />
                        <span>{student.email}</span>
                      </div>
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex items-center">
                        <Badge 
                          className={`transition-all duration-300 ease-in-out ${student.phoneVerified ? "bg-green-500" : "bg-yellow-400"} hover:scale-105`}
                        >
                          {student.phoneVerified ? "Verified" : "Not Verified"}
                        </Badge>
                      </div>
                    </TableCell> */}
                    <TableCell>
                      <Badge
                        className={`transition-all duration-300 ease-in-out ${
                          student.last_login <
                          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                            ? "bg-green-500"
                            : "bg-yellow-400"
                        } hover:scale-105`}
                      >
                        {student.last_login >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                          ? "Inactive"
                          : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => toggleStudentStatus(student.user_id)}
                        variant={student.is_blocked ? "destructive" : "default"}
                        className={`w-24 h-10 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                          student.is_blocked
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        {student.is_blocked ? "Unblock" : "Block"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center items-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => paginate(currentPage - 1)}
                      className={`transition-all duration-300 ease-in-out ${
                        currentPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:scale-105"
                      }`}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => {
                    if (
                      i === 0 ||
                      i === totalPages - 1 ||
                      (i >= currentPage - 2 && i <= currentPage)
                    ) {
                      return (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => paginate(i + 1)}
                            isActive={currentPage === i + 1}
                            className={`transition-all duration-300 ease-in-out hover:scale-105 ${
                              currentPage === i + 1
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (i === currentPage - 3 || i === currentPage + 1) {
                      return <PaginationEllipsis key={i} />;
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => paginate(currentPage + 1)}
                      className={`transition-all duration-300 ease-in-out ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:scale-105"
                      }`}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StudentManagement;
