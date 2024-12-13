/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

export function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>Order ID: {order?.id}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
          <p>Name: {order?.student_id}</p>
          <p>Date: {order?.date}</p>
          <p>Total: ${order?.total?.toFixed(2)}</p>
          <p>
            Status:{" "}
            <Badge className={`${getStatusColor(order?.status)} text-white`}>
              {order?.status}
            </Badge>
          </p>
          <p>Shipping Address: {order?.shippingAddress}</p>
          <p>Payment Method: {order?.paymentMethod}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Order Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.items?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
