import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getStatusColor } from "@/lib/helpers";
// import { updateWithdrawalStatus } from "@/api/backendCalls/admin";
import moment from "moment";

export function WithdrawalDetailsModal({ isOpen, onClose, request, onStatusUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
    //   await updateWithdrawalStatus(request.request_id, newStatus, rejectionReason);
    //   onStatusUpdate(request.request_id, newStatus);
      handleClose();
    } catch (error) {
      console.error("Error updating withdrawal status:", error);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Withdrawal Request Details</DialogTitle>
          <DialogDescription>
            Detailed information about the withdrawal request.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Request ID:</Label>
            <span>{request.request_id}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Tutor Name:</Label>
            <span>{request.tutor_name}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Amount:</Label>
            <span>₹{request.amount.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Date Requested:</Label>
            <span>{moment(request.created_at).format("DD-MM-YYYY HH:mm")}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Status:</Label>
            <Badge className={`${getStatusColor(request.status)} text-white`}>
              {request.status}
            </Badge>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Payment Method:</Label>
            <span>{request.payment_method}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Account Details:</Label>
            <span>{request.account_details}</span>
          </div>
          {request?.status === "rejected" && (
            <div className="grid grid-cols-2 items-center gap-4">
              <Label>Rejection Reason:</Label>
              <span>{request.rejection_reason}</span>
            </div>
          )}
          {request.status === "pending" && (
            <div className="grid grid-cols-1 gap-4">
              <Label htmlFor="rejectionReason">Rejection Reason (optional):</Label>
              <Textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
              />
            </div>
          )}
        </div>
        <DialogFooter>
          {request?.status === "pending" && (
            <>
              <Button onClick={() => handleStatusUpdate("approved")} className="bg-green-500 hover:bg-green-600 text-white">
                Approve
              </Button>
              <Button onClick={() => handleStatusUpdate("rejected")} className="bg-red-500 hover:bg-red-600 text-white">
                Reject
              </Button>
            </>
          )}
          <Button onClick={handleClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

