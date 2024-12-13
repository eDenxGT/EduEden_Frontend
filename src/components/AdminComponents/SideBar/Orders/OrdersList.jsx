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
import { Eye } from "lucide-react";
import { OrderDetailsModal } from "./OrderListModal";
import { getAllOrders } from "@/api/backendCalls/admin";
import moment from "moment";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "success":
      return "bg-green-500";
    case "rejected":
      return "bg-red-500";
    case "pending":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

export default function AdminOrderList() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  const fetchOrders = useCallback(async () => {
    console.log("FETCJGN ORDERSSS");
    const fetchedOrders = await getAllOrders();
    console.log(fetchedOrders);
    setOrders(fetchedOrders);
    return fetchedOrders;
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  console.log(orders);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Order List</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order?._id}>
                <TableCell>{order?._id}</TableCell>
                <TableCell>{order?.student_id}</TableCell>
                <TableCell>
                  {moment(order?.created_at).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>${order?.amount?.toFixed(2)}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </div>
  );
}
