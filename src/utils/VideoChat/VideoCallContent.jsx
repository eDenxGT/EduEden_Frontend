/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from "react";
import { UserInfo } from "./UserInfo";
import { Button } from "@/components/ui/button";
import { Minimize2, Maximize2 } from "lucide-react";
import { VideoControls } from "./VideoControls";
import useCallContext from "@/contexts/CallProvider";
// import { toast } from "@/hooks/use-toast";
import socket from "@/Services/Socket";

function VideoCallContent({
  // caller,
  isMobile,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [interactionTimeout, setInteractionTimeout] = useState(null);
  const containerRef = useRef(null);

  const {
    myVideoRef,
    peerVideoRef,
    isFullScreen,
    setIsFullScreen,
    callerData,
    incomingCallInfo,
    streamRef,
    peerStreamRef,
  } = useCallContext();

  const toggleFullScreen = useCallback(() => {
    console.log("STREAM", streamRef.current);
    setIsFullScreen((prev) => !prev);
  }, []);

  // useEffect(() => {
  //   socket.on("incomingCall", handleIncomingCall);
  //   socket.on("callEnded", destroyConnection);

  //   return () => {
  //     socket.off("incomingCall", handleIncomingCall);
  //     socket.off("callEnded", destroyConnection);
  //   };
  // }, []);

  useEffect(() => {
    if (isFullScreen && myVideoRef.current && streamRef.current) {
      console.log("STREAM NEW FULL", streamRef.current);
      myVideoRef.current.srcObject = streamRef.current;
    }
    if (isFullScreen && peerVideoRef.current && peerStreamRef.current) {
      peerVideoRef.current.srcObject = peerStreamRef.current;
    }
  }, [
    isFullScreen,
    streamRef.current,
    peerStreamRef.current
  ]);

  useEffect(() => {
    if (streamRef.current && myVideoRef.current) {
      myVideoRef.current.srcObject = streamRef.current;
    }
    if (peerStreamRef.current && peerVideoRef.current) {
      peerVideoRef.current.srcObject = peerStreamRef.current;
    }
  }, [
    streamRef.current,
    peerStreamRef.current
  ]);

  const handleInteraction = () => {
    if (interactionTimeout) {
      clearTimeout(interactionTimeout);
    }

    setIsHovering(true);

    const timeout = setTimeout(
      () => {
        setIsHovering(false);
      },
      isMobile ? 5000 : 2000
    );
    setInteractionTimeout(timeout);
  };

  const handleClick = () => {
    if (isMobile) {
      if (interactionTimeout) {
        clearTimeout(interactionTimeout);
        setIsHovering(false);
      } else {
        handleInteraction();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleClick);
      return () => {
        container.removeEventListener("touchstart", handleClick);
      };
    }
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleInteraction}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      {/* Main Video (Callee) */}
      
      <video
        className="w-full h-full object-cover"
        ref={peerVideoRef}
        autoPlay
        muted={false}
        playsInline
      />

      {/* Caller Video */}
      <div
        className={`absolute transition-all duration-300 ease-in-out ${
          isFullScreen
            ? isHovering
              ? "bottom-20 left-4 h-56"
              : "bottom-4 left-4 h-56"
            : isHovering
            ? "bottom-20 left-2 h-16"
            : "bottom-2 left-2 h-16"
        } rounded-lg overflow-hidden`}
      >
        <video
          className="w-full h-full bg-slate-500 object-cover"
          ref={myVideoRef}
          autoPlay
          muted={false}
          playsInline
        />
      </div>

      {/* Overlay for controls */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top bar */}
        <div
          className={`absolute top-0 left-0 right-0 flex justify-between items-center p-4 ${
            isFullScreen ? "fixed" : ""
          }`}
        >
          <UserInfo
            name={callerData?.name || incomingCallInfo?.callerData?.name}
            status="In call"
            avatar={callerData?.avatar || incomingCallInfo?.callerData?.avatar}
          />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullScreen}
              className="text-white hover:bg-white/20"
            >
              {isFullScreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 flex justify-center p-4 ${
            isFullScreen ? "fixed" : ""
          }`}
        >
          <VideoControls isFullScreen={isFullScreen} />
        </div>
      </div>
    </div>
  );
}

export default VideoCallContent;
