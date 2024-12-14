/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/helpers";
import moment from "moment";

export default function PurchaseDetailsModal({ isOpen, onClose, purchase }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);
  console.log(purchase)

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
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
            <span>{moment(purchase?.created_at).format("DD-MM-YYYY - hh:mm A")}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Amount:</span>
            <span>₹{purchase.amount.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Status:</span>
            <Badge className={`${getStatusColor(purchase.status)} text-white`}>
              {purchase.status}
            </Badge>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Course:</span>
            <span>{purchase.course_details?.[0]?.title}</span>
          </div>
          {/* <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Tutor:</span>
            <span>{purchase.tutor_name}</span>
          </div> */}
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
          <Button onClick={handleClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

