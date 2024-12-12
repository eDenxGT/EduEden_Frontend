import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, PhoneOff } from "lucide-react";
import useCallContext from "@/contexts/CallProvider";

export function CallPopup() {
  const {
    incomingCallInfo,
    isCallPopupOpen,
    setIsCallPopupOpen,
    answerCall,
    endCall,
    setupStream,
    setIsVisible
  } = useCallContext();
  const handleAcceptCall = async () => {
    await setupStream();
    setIsCallPopupOpen(false);
    setIsVisible(true);
    answerCall();
  };
  const handleEndCall = () => {
    endCall(incomingCallInfo);
    setIsCallPopupOpen(false);
  };
  console.log("Incoming call info:", incomingCallInfo);
  const caller = incomingCallInfo?.callerData;
  return (
    <Dialog open={isCallPopupOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Incoming Call</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-24 w-24 border-4 border-green-500">
            <AvatarImage src={caller?.avatar} />
            <AvatarFallback>{caller?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{caller?.name}</h2>
            <p className="text-sm text-muted-foreground">
              Incoming video call...
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <Button
              variant="destructive"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={handleEndCall}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600"
              onClick={handleAcceptCall}
            >
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
