import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Search, Eye, Check, X } from 'lucide-react';
import { toast } from "sonner";
import { useLoading } from "../../../contexts/LoadingContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { axiosInstance } from "@/api/axiosConfig";
import { Description } from "@radix-ui/react-dialog";

const TutorApplications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [tutorApplications, setTutorApplications] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [tutorsPerPage] = useState(5);

  const { startSpinnerLoading, stopSpinnerLoading } = useLoading();
  const isDarkMode = useSelector((state) => state.admin.toggleTheme);

  useEffect(() => {
    const fetchTutorApplications = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/admin/get-tutor-applications"
        );
        if (response.status === 200) {
          setTutorApplications(response.data.applications);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.log("Tutor applications fetching error:", error);
        toast.error("Failed to fetch tutor applications");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorApplications();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
    //search logic
  };

  const handleAccept = async () => {
    try {
      if (!selectedTutor) return;
      startSpinnerLoading();
      setIsConfirmationModalOpen(false);
      await axiosInstance.put("/admin/update-tutor-status", {
        tutor_id: selectedTutor.user_id,
        status: "accept",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTutorApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === selectedTutor._id
            ? { ...app, is_identity_verified: "accept" }
            : app
        )
      );
      setSelectedTutor(null);
      toast.success("Tutor application accepted successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to accept tutor application");
    } finally {
      stopSpinnerLoading();
    }
  };

  const handleReject = async () => {
    try {
      if (!selectedTutor) return;
      startSpinnerLoading();
      setIsConfirmationModalOpen(false);
      await axiosInstance.put("/admin/update-tutor-status", {
        tutor_id: selectedTutor.user_id,
        status: "rejected",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTutorApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === selectedTutor._id
            ? { ...app, is_identity_verified: "rejected" }
            : app
        )
      );
      setSelectedTutor(null);
      toast.success("Tutor application rejected successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to reject tutor application");
    } finally {
      stopSpinnerLoading();
    }
  };

  const handleConfirmationModal = (tutor, action) => {
    setSelectedTutor(tutor);
    setActionType(action);
    setIsConfirmationModalOpen(true);
  };

  const handleViewDetails = (tutor) => {
    setSelectedTutor(tutor);
    setIsDetailsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accept":
        return <Badge className="bg-green-400">Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-400">Pending</Badge>;
      default:
        return <Badge className="bg-yellow-400">Pending</Badge>;
    }
  };

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutorApplications?.slice(
    indexOfFirstTutor,
    indexOfLastTutor
  );
  const totalPages = Math.ceil(tutorApplications?.length / tutorsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setIsPageChanging(true);
      setCurrentPage(pageNumber);
      setTimeout(() => setIsPageChanging(false), 300);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tutor Applications</h1>
        <Card
          className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6`}
        >
          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search tutor applications..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={`w-full pl-10 ${
                  isDarkMode
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-gray-200 text-gray-800 placeholder-gray-500"
                } transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold w-1/4">Name</TableHead>
                  <TableHead className="font-bold w-1/4">Email</TableHead>
                  <TableHead className="font-bold w-1/4">Status</TableHead>
                  <TableHead className="font-bold w-1/4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody
                className={`transition-opacity duration-300 ${
                  isPageChanging ? "opacity-0" : "opacity-100"
                }`}
              >
                {!loading && (!tutorApplications || tutorApplications.length === 0) ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        No tutor applications found.
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentTutors?.map((tutor) => (
                    <TableRow
                      key={tutor.user_id}
                      className="transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <TableCell className="font-medium">
                        {tutor.full_name || "N/A"}
                      </TableCell>
                      <TableCell>{tutor.email || "N/A"}</TableCell>
                      <TableCell>
                        {getStatusBadge(tutor.is_identity_verified)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(tutor)}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                          >
                            <Eye size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleConfirmationModal(tutor, "accept")}
                            className="text-green-500 hover:text-green-700 hover:bg-green-100 transition-colors duration-200"
                          >
                            <Check size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleConfirmationModal(tutor, "reject")}
                            disabled={tutor.is_identity_verified === "rejected"}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors duration-200"
                          >
                            <X size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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

      {/* Tutor Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent
          className={isDarkMode ? "bg-gray-800 text-white" : "bg-white"}
        >
          <DialogHeader>
            <DialogTitle>Tutor Details</DialogTitle>
          </DialogHeader>
          <Description>
            {selectedTutor && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold">Name:</span>
                  <span className="col-span-3">
                    {selectedTutor.full_name || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold">Email:</span>
                  <span className="col-span-3">
                    {selectedTutor.email || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold">Field:</span>
                  <span className="col-span-3">
                    {selectedTutor.field_name || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold">Experience:</span>
                  <span className="col-span-3">
                    {selectedTutor.experience
                      ? selectedTutor.experience + " years"
                      : "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-bold">Status:</span>
                  <span className="col-span-3">
                    {getStatusBadge(selectedTutor.is_identity_verified) || "N/A"}
                  </span>
                </div>
              </div>
            )}
          </Description>
          <DialogFooter>
            <Button onClick={() => setIsDetailsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog
        open={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
      >
        <DialogContent
          className={isDarkMode ? "bg-gray-800 text-white" : "bg-white"}
        >
          <DialogHeader>
            <DialogTitle>
              {actionType === "accept"
                ? "Accept Tutor Application"
                : "Reject Tutor Application"}
            </DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to {actionType} this tutor application?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmationModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={actionType === "accept" ? handleAccept : handleReject}
              className={`${
                actionType === "accept"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white`}
            >
              {actionType === "accept" ? "Accept" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TutorApplications;