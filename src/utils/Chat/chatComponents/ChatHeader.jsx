/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Video,
  MoreVertical,
  UserCircle,
  Ban,
  Flag,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ChatHeader({ conversation }) {
  // const {
  //   chats: conversations,
  //   activeChat,
  // } = useSelector((state) => state?.chat)
  // const conversation = conversations.find((conversation) => conversation?._id === activeChat?._id)

  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const handleBlock = () => {
    console.log("User blocked");
    setShowBlockConfirmation(false);
  };

  const handleDelete = () => {
    console.log("Chat deleted");
    setShowDeleteConfirmation(false);
  };

  const handleReport = () => {
    console.log("User reported:", reportReason);
    setShowReportDialog(false);
    setReportReason("");
  };

  return (
    <div className="flex items-center justify-between border-b p-3">
      {conversation === null ? (
        <div className="flex items-center gap-3">
          {/* <UserAvatar size="md" /> */}
          <div>
            <h3 className="font-semibold text-sm"></h3>
            <p className="text-xs text-muted-foreground"></p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <UserAvatar status={"disabled"} user={conversation?.userDetails?.[0]} size="md" />
            <div>
              <h3 className="font-semibold text-sm">
                {conversation?.userDetails?.[0]?.full_name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {/* {role === "student"
                  ? conversation?.tutor_is_online
                    ? "Online"
                    : "Offline"
                  : role === "tutor"
                  ? conversation?.student_is_online
                    ? "Online"
                    : "Offline"
                  : null} */}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setShowBlockConfirmation(true)}
                >
                  <Ban className="mr-2 h-4 w-4" />
                  <span>Block User</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setShowReportDialog(true)}>
                  <Flag className="mr-2 h-4 w-4" />
                  <span>Report User</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteConfirmation(true)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Chat</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <AlertDialog
            open={showBlockConfirmation}
            onOpenChange={setShowBlockConfirmation}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to block this{" "}
                  {conversation?.userDetails?.[0]?.full_name?.split(" ")[0]}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action can be undone. But you will no longer be able to
                  message this user till you are unblocked their account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleBlock}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Block User
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog
            open={showDeleteConfirmation}
            onOpenChange={setShowDeleteConfirmation}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this chat?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All messages in this chat will
                  be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete Chat
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Report{" "}
                  {conversation?.userDetails?.[0]?.full_name?.split(" ")[0] ||
                    "User"}
                </DialogTitle>
                <DialogDescription>
                  Please provide a reason for reporting{" "}
                  {conversation?.userDetails?.[0]?.full_name?.split(" ")[0] ||
                    "this user"}
                  . Your report will be reviewed by our team.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="report-reason">Reason for reporting</Label>
                  <Textarea
                    id="report-reason"
                    placeholder="Type your reason here..."
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowReportDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReport}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Submit Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
