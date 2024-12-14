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
import { Eye, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { WithdrawalDetailsModal } from "./WithdrawDetailsModal";
import moment from "moment";
import { BiReset } from "react-icons/bi";
import { getStatusColor } from "@/lib/helpers";
import debounce from "lodash/debounce";
// import {
//   getWithdrawalRequests,
//   updateWithdrawalStatus,
// } from "@/api/backendCalls/admin";

export default function WithdrawalRequests() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const requestsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAmountRange, setSelectedAmountRange] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedStatus("");
    setSelectedAmountRange("");
    setSortOrder("desc");
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
    //   await updateWithdrawalStatus(requestId, newStatus);
    //   fetchRequests();
    } catch (error) {
      console.error("Error updating withdrawal status:", error);
    }
  };

  const fetchRequests = useCallback(async () => {
    const params = new URLSearchParams();
    params.append("page", currentPage);
    params.append("limit", requestsPerPage);
    if (searchTerm) params.append("search", searchTerm);
    if (selectedStatus) params.append("status", selectedStatus);
    if (selectedAmountRange) params.append("amountRange", selectedAmountRange);
    params.append("sortOrder", sortOrder);
    fetchRequestsDebounced(params, setRequests, setTotalPages);
  }, [
    currentPage,
    requestsPerPage,
    searchTerm,
    selectedStatus,
    selectedAmountRange,
    sortOrder,
  ]);

  const fetchRequestsDebounced = debounce(
    async (params, setRequests, setTotalPages) => {
      try {
        // const fetchedRequests = await getWithdrawalRequests(params);
        // setRequests(fetchedRequests.requests);
        // setTotalPages(fetchedRequests.totalPages);
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
      }
    },
    500
  );

  useEffect(() => {
    fetchRequests();
  }, [
    currentPage,
    requestsPerPage,
    searchTerm,
    selectedStatus,
    selectedAmountRange,
    sortOrder,
  ]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-5">Tutor Withdrawal Requests</h1>
      
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search requests..."
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
            <Label htmlFor="status">Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amountRange">Amount Range</Label>
            <Select
              value={selectedAmountRange}
              onValueChange={setSelectedAmountRange}
            >
              <SelectTrigger id="amountRange">
                <SelectValue placeholder="Select Amount Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="0-1000">₹0 - ₹1000</SelectItem>
                <SelectItem value="1000-5000">₹1000 - ₹5000</SelectItem>
                <SelectItem value="5000-10000">₹5000 - ₹10000</SelectItem>
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
              <TableHead className="text-center">Request ID</TableHead>
              <TableHead className="text-center">Tutor Name</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.length > 0 ? (
              requests?.map((request) => (
                <TableRow key={request?.request_id}>
                  <TableCell className="text-center">
                    {request?.request_id?.slice(0, 10) + "..."}
                  </TableCell>
                  <TableCell className="text-center">{request?.tutor_name}</TableCell>
                  <TableCell className="text-center">₹{request?.amount?.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    {moment(request?.created_at).format("DD-MM-YYYY - hh:mm A")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${getStatusColor(request?.status)} text-white`}>
                      {request?.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request?.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(request.request_id, "approved")}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(request.request_id, "rejected")}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No withdrawal requests found.
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <WithdrawalDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}

