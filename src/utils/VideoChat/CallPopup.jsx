import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, PhoneOff, Volume2, VolumeX } from 'lucide-react';
import useCallContext from "@/contexts/CallProvider";
import { motion, AnimatePresence } from "framer-motion";

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

  const [audio] = useState(new Audio("/eduedenRingTone.mp3"));
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    if (isCallPopupOpen) {
      audio.loop = true;
      if (!isMuted) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isCallPopupOpen, audio, isMuted]);

  const handleAcceptCall = async () => {
    await setupStream();
    setIsCallPopupOpen(false);
    setIsVisible(true);
    answerCall();
    audio.pause();
  };

  const handleEndCall = () => {
    endCall(incomingCallInfo);
    setIsCallPopupOpen(false);
    audio.pause();
  };

  const caller = incomingCallInfo?.callerData;

  return (
    <AnimatePresence>
      {isCallPopupOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Card className="w-96 shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 border-2 border-green-500">
                  <AvatarImage src={caller?.avatar} />
                  <AvatarFallback>{caller?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h2 className="text-sm font-semibold truncate">{caller?.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    Incoming video call...
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={handleEndCall}
                  >
                    <PhoneOff className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-green-500 hover:bg-green-600"
                    onClick={handleAcceptCall}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

