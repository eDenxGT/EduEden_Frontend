/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rnd } from "react-rnd";
import VideoCallContent from "./VideoCallContent";
import useCallContext from "@/contexts/CallProvider";

export default function PopupVideoCall({ onClose }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { isFullScreen, isVisible } = useCallContext();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setPosition({
        x: window.innerWidth - 420,
        y: window.innerHeight - 280,
      });
    }
  }, [isMobile]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isFullScreen || isMobile ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black"
        >
          <VideoCallContent
            // caller={callerId}
            isMobile={isMobile}
          />
        </motion.div>
      ) : (
        <Rnd
          default={{
            x: position.x,
            y: position.y,
            width: 400,
            height: 260,
          }}
          disableDragging={false}
          enableResizing={false}
          bounds="window"
          onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full bg-black rounded-lg overflow-hidden shadow-xl"
          >
            <VideoCallContent
            //   caller={callerId}
              isMobile={isMobile}
            />
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
}
