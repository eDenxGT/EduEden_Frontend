import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  Users,
} from "lucide-react";
import useCallContext from "@/contexts/CallProvider";

export function VideoControls() {
  const {
    isVideoOff,
    isMuted,
    endCall,
    isFullScreen,
    toggleVideo,
    toggleAudio,
  } = useCallContext();

  const handleEndCall = () => {
    endCall();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
        onClick={toggleAudio}
      >
        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
        onClick={toggleVideo}
      >
        {isVideoOff ? (
          <VideoOff className="h-5 w-5" />
        ) : (
          <Video className="h-5 w-5" />
        )}
      </Button>
      {/* {isFullScreen && (
        <>
           <Button
            variant="ghost"
            onClick={startScreenSharing}
            size="icon"
            className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ScreenShare className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <Users className="h-5 w-5" />
          </Button>
        </>
      )}  */}
      <Button
        variant="destructive"
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={handleEndCall}
      >
        <PhoneOff className="h-5 w-5" />
      </Button>
    </div>
  );
}
