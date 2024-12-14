import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import PurchaseDetailsModal from "./PurchaseDetailsModal";
import moment from "moment";
import { BiReset } from "react-icons/bi";
import { getStatusColor } from "@/lib/helpers";
import debounce from "lodash/debounce";
import {
  getAllTutorsForStudents,
  getStudentPurchases,
} from "@/api/backendCalls/student";
import { getAllCourses } from "@/api/backendCalls/course";

export default function PurchaseHistory() {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tutors, setTutors] = useState([]);
  const [courses, setCourses] = useState([]);
  const purchasesPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTutor, setSelectedTutor] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleViewDetails = (purchase) => {
    setSelectedPurchase(purchase);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPurchase(null);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCourse("");
    setSelectedTutor("");
    setSelectedPriceRange("");
    setSortOrder("");
  };

  const fetchTutorsAndCourses = useCallback(async () => {
    try {
      const tutors = await getAllTutorsForStudents("forPurchaseHistory");
      const courses = await getAllCourses("forPurchaseHistory");
      setTutors(tutors);
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching tutors and courses:", error);
    }
  }, []);

  const fetchPurchases = useCallback(async () => {
    const params = new URLSearchParams();
    params.append("page", currentPage);
    params.append("limit", purchasesPerPage);
    if (searchTerm) params.append("search", searchTerm);
    if (selectedCourse) params.append("course", selectedCourse);
    if (selectedTutor) params.append("tutor", selectedTutor);
    if (selectedPriceRange) params.append("priceRange", selectedPriceRange);
    params.append("sortOrder", sortOrder);
    fetchPurchasesDebounced(params, setPurchases, setTotalPages);
  }, [
    currentPage,
    purchasesPerPage,
    searchTerm,
    selectedCourse,
    selectedTutor,
    selectedPriceRange,
    sortOrder,
  ]);

  const fetchPurchasesDebounced = debounce(
    async (params, setPurchases, setTotalPages) => {
      try {
        const fetchedPurchases = await getStudentPurchases(params);
        setPurchases(fetchedPurchases.purchases);
        setTotalPages(fetchedPurchases.totalPages);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    },
    500
  );

  useEffect(() => {
    fetchPurchases();
  }, [
    currentPage,
    purchasesPerPage,
    searchTerm,
    selectedCourse,
    selectedTutor,
    selectedPriceRange,
    sortOrder,
  ]);

  useEffect(() => {
    fetchTutorsAndCourses();
  }, [fetchTutorsAndCourses]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-4 lg:px-4 max-w-7xl">
      <h1 className="text-2xl font-bold mb-5">Purchase History</h1>
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search purchases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" onClick={handleResetFilters}>
            Reset All Filters
            <BiReset className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="course">Course</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger id="course">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courses?.map((course) => (
                  <SelectItem key={course?.course_id} value={course?.course_id}>
                    {course?.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tutor">Tutor</Label>
            <Select value={selectedTutor} onValueChange={setSelectedTutor}>
              <SelectTrigger id="tutor">
                <SelectValue placeholder="Select Tutor" />
              </SelectTrigger>
              <SelectContent>
                {tutors?.map((tutor) => (
                  <SelectItem key={tutor?.user_id} value={tutor?.user_id}>
                    {tutor?.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priceRange">Price Range</Label>
            <Select
              value={selectedPriceRange}
              onValueChange={setSelectedPriceRange}
            >
              <SelectTrigger id="priceRange">
                <SelectValue placeholder="Select Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">All</SelectItem>
                <SelectItem value="0-1000">₹0 - ₹1000</SelectItem>
                <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                <SelectItem value="2000-3000">₹2000 - ₹3000</SelectItem>
                <SelectItem value="3000-4000">₹3000 - ₹4000</SelectItem>
                <SelectItem value="4000-7000">₹4000 - ₹7000</SelectItem>
                <SelectItem value="7000-10000">₹7000 - ₹10000</SelectItem>
                <SelectItem value="10000">₹10000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dateSort">Sort by Date</Label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger id="dateSort">
                <SelectValue placeholder="Select Sort Order" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="none">None</SelectItem> */}
                <SelectItem value="asc">Oldest to Newest</SelectItem>
                <SelectItem value="desc">Newest to Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases?.length > 0 ? (
              purchases?.map((purchase, index) => (
                <TableRow key={purchase?.order_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {purchase?.order_id?.slice(0, 10) + "..."}
                  </TableCell>
                  <TableCell>
                    {purchase?.course_details[0]?.title?.slice(0, 20) + "..."}
                  </TableCell>
                  <TableCell>
                    {moment(purchase?.created_at).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>₹{purchase?.amount?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(
                        purchase?.status
                      )} text-white`}
                    >
                      {purchase?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(purchase)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No purchases found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <PurchaseDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        purchase={selectedPurchase}
      />
    </div>
  );
}
