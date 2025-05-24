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

const TutorManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [tutorsPerPage] = useState(5);
  const [state, setState] = useState({
    tutors: [],
    filteredTutors: [],
  });
  const [isPageChanging, setIsPageChanging] = useState(false);

  const isDarkMode = useSelector((state) => state.admin.toggleTheme);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axiosInstance("/admin/get-tutors");
        if (response.status === 200) {
          setState({
            tutors: response.data.tutors,
            filteredTutors: response.data.tutors,
          });
        }
      } catch (error) {
        console.log("Tutors fetching error Admin side:", error);
        toast.error("Failed to fetch tutors");
      }
    };

    fetchTutors();
  }, []);

  const handleSearch = debounce(async (query) => {
    try {
      if (!query) {
        setState((prevState) => ({
          ...prevState,
          filteredTutors: prevState.tutors,
        }));
        return;
      }
      const response = await axiosInstance.get(
        `/admin/search-tutors?query=${query}`
      );
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          filteredTutors: response.data.tutors,
        }));
      }
    } catch (error) {
      console.log("Search Tutors Error: ", error);
      toast.error(error?.response?.data?.message);
    }
  }, 1000);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors =
    Array.isArray(state.filteredTutors) && state.filteredTutors.length > 0
      ? state.filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor)
      : [];

  const totalPages = Math.ceil(state.filteredTutors.length / tutorsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setIsPageChanging(true);
      setCurrentPage(pageNumber);
      setTimeout(() => setIsPageChanging(false), 300);
    }
  };

  const toggleTutorStatus = async (tutorId) => {
    try {
      const response = await axiosInstance.post("/admin/toggle-tutor-status", {
        tutorId,
      });
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          tutors: prevState.tutors.map((tutor) =>
            tutor.user_id === tutorId
              ? { ...tutor, is_blocked: !tutor.is_blocked }
              : tutor
          ),
          filteredTutors: prevState.filteredTutors.map((tutor) =>
            tutor.user_id === tutorId
              ? { ...tutor, is_blocked: !tutor.is_blocked }
              : tutor
          ),
        }));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Toggle Tutor Status Error: ", error);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tutor Management</h1>
        <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6`}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search tutors..."
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
                  <TableHead>Tutor</TableHead>
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
                {currentTutors.map((tutor) => (
                  <TableRow
                    key={tutor.user_id}
                    className="transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {tutor.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
                              src={tutor.avatar}
                              alt=""
                            />
                          ) : (
                            <UserCircle className="w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-110" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">
                            {tutor.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            UID: {tutor?.user_id || "UID Not Found"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="mr-2" />
                        <span>{tutor.email}</span>
                      </div>
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex items-center">
                        <Badge
                          className={`transition-all duration-300 ease-in-out ${
                            tutor.phoneVerified
                              ? "bg-green-500"
                              : "bg-yellow-400"
                          } hover:scale-105`}
                        >
                          {tutor.phoneVerified ? "Verified" : "Not Verified"}
                        </Badge>
                      </div>
                    </TableCell> */}
                    <TableCell>{tutor.last_login || "Inactive"}</TableCell> 
                    <TableCell>
                      <Button
                        onClick={() => toggleTutorStatus(tutor.user_id)}
                        variant={tutor.is_blocked ? "destructive" : "default"}
                        className={`w-24 h-10 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                          tutor.is_blocked
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        {tutor.is_blocked ? "Unblock" : "Block"}
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

export default TutorManagement;
