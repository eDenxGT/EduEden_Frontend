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
import { OrderDetailsModal } from "./OrderListModal";
import { getAllOrders, getAllTutors } from "@/api/backendCalls/admin";
import moment from "moment";
import { BiReset } from "react-icons/bi";
import { getStatusColor } from "@/lib/helpers";
import debounce from "lodash/debounce";
import { getAllCourses } from "@/api/backendCalls/course";

export default function AdminOrderList() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tutors, setTutors] = useState([]);
  const [courses, setCourses] = useState([]);
  const ordersPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTutor, setSelectedTutor] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCourse("");
    setSelectedTutor("");
    setSelectedPriceRange("");
    setDateRange({ start: "", end: "" });
  };

  const fetchTutorsAndCourses = useCallback(async () => {
    try {
      const tutors = await getAllTutors("ordersList");
      const courses = await getAllCourses("ordersList");
      setTutors(tutors);
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    const params = new URLSearchParams();
    params.append("page", currentPage);
    params.append("limit", ordersPerPage);
    if (searchTerm) params.append("search", searchTerm);
    if (selectedCourse) params.append("course", selectedCourse);
    if (selectedTutor) params.append("tutor", selectedTutor);
    if (selectedPriceRange) params.append("priceRange", selectedPriceRange);
    if (dateRange.start) params.append("startDate", dateRange.start);
    if (dateRange.end) params.append("endDate", dateRange.end);

    fetchOrdersDebounced(params, setOrders, setTotalPages);
  }, [
    currentPage,
    ordersPerPage,
    searchTerm,
    selectedCourse,
    selectedTutor,
    selectedPriceRange,
    dateRange,
  ]);

  const fetchOrdersDebounced = debounce(
    async (params, setOrders, setTotalPages) => {
      try {
        const fetchedOrders = await getAllOrders(params, "ordersList");
        setOrders(fetchedOrders.orders);
        setTotalPages(fetchedOrders.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    500
  );

  useEffect(() => {
    fetchOrders();
  }, [
    currentPage,
    ordersPerPage,
    searchTerm,
    selectedCourse,
    selectedTutor,
    selectedPriceRange,
    dateRange,
  ]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    fetchTutorsAndCourses();
  }, [fetchTutorsAndCourses]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-4 lg:px-4 max-w-7xl">
      <h1 className="text-2xl font-bold mb-5">Order List</h1>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" onClick={handleResetFilters}>
            Reset All Filters
            <BiReset className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                <SelectValue
                  defaultValue={"0"}
                  placeholder="Select Price Range"
                />
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
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-none border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>More Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders?.map((order, index) => (
                <TableRow key={order?.order_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order?.order_id?.slice(0, 10) + "..."}</TableCell>
                  <TableCell>{order?.student_name}</TableCell>
                  <TableCell>
                    {moment(order?.created_at).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>₹{order?.amount?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(order?.status)} text-white`}
                    >
                      {order?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No orders found.
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

      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        tutors={tutors}
      />
    </div>
  );
}
