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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { getStatusColor } from "@/lib/helpers";

export function OrderDetailsModal({ isOpen, onClose, order, tutors }) {
  if (!order) return null;
  const getTutorName = (tutor_id) => {
    const tutor = tutors?.find((tutor) => tutor?.user_id === tutor_id);
    return tutor ? tutor?.full_name : "N/A";
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>Order ID: {order?.order_id}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
          <p>Name: {order?.student_name}</p>
          <p>Date: {moment(order?.created_at).format("MMM-DD-YYYY")}</p>
          <p>Total: ${order?.amount?.toFixed(2)}</p>
          <p>
            Status:{" "}
            <Badge className={`${getStatusColor(order?.status)}  text-white`}>
              {order?.status}
            </Badge>
          </p>
          <p>Payment Method: {"Razor Pay"}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Ordered Courses</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sl No.</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Seller (or Tutor)</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.course_details?.map((item, index) => (
                <TableRow key={item.course_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{getTutorName(item.tutor_id)}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total:</TableCell>
                <TableCell>${order?.amount?.toFixed(2)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
