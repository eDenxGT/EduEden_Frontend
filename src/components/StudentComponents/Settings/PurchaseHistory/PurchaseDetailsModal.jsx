/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/helpers";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RazorpayButton from "@/Services/Payment";
import { toast } from "sonner";

export default function PurchaseDetailsModal({ isOpen, onClose, purchase }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const navigate = useNavigate();
  const { user_id } = useSelector((state) => state.student.studentData);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);
  console.log(purchase);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handlePaymentSuccess = () => {
    if (purchase.course_details?.length > 1) {
      navigate(`/student/my-courses`);
    } else if (purchase.course_details?.length === 1) {
      navigate(`/student/my-courses/${purchase.course_details[0]?.course_id}`);
    }
    toast.success("Re-order completed!");
    handleClose();
  };

  if (!purchase) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase Details</DialogTitle>
          <DialogDescription>
            Detailed information about your purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Purchase ID:</span>
            <span>{purchase?.order_id}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Date:</span>
            <span>
              {moment(purchase?.created_at).format("DD-MM-YYYY - hh:mm A")}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Amount:</span>
            <span>₹{purchase.amount.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Status:</span>
            <Badge
              className={`${getStatusColor(
                purchase.status
              )} max-w-fit text-white`}
            >
              {purchase.status}
            </Badge>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            {purchase.course_details?.length > 1 ? (
              <>
                <span className="font-semibold">Courses:</span>
                <span className="text-sm max-h-20 overflow-y-auto">
                  {purchase.course_details
                    ?.map((course) => course.title)
                    .join(` , `)}
                </span>
              </>
            ) : (
              <>
                <span className="font-semibold">Course:</span>
                <span>{purchase.course_details?.[0]?.title}</span>
              </>
            )}
          </div>
          {/* <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Tutor:</span>
            <span>{purchase.tutor_name}</span>
          </div> */}
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Courses Quantity:</span>
            <span>{purchase.course_details?.length} Courses</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Payment Method:</span>
            <span>{"Razor Pay"}</span>
          </div>
          {purchase.transaction_id && (
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Transaction ID:</span>
              <span>{purchase.transaction_id}</span>
            </div>
          )}
        </div>
        <DialogFooter>
          {purchase.status === "cancelled" && (
            <RazorpayButton
              onClick={handleClose}
              courses={purchase.course_details}
              student_id={user_id}
              amount={purchase.amount}
              className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded  text-lg font-semibold"
              handleSuccess={handlePaymentSuccess}
              button_text="Re-order"
            />
          )}
          <Button
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded  text-lg font-semibold"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
