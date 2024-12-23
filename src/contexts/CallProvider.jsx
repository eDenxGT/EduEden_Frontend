/* eslint-disable react/prop-types */
import socket from "@/Services/Socket";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SimplePeer from "simple-peer/simplepeer.min";

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const myVideoRef = useRef();
  const peerVideoRef = useRef();
  const connectionRef = useRef();
  const streamRef = useRef(null);
  const peerStreamRef = useRef(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callerData, setCallerData] = useState(null);
  const [incomingCallInfo, setIncomingCallInfo] = useState({});
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const [callInitiatorData, setCallInitiatorData] = useState(null);

  useEffect(() => {
    console.log("Stream updated:", streamRef.current);
  }, [streamRef.current]);
  useEffect(() => {
    console.log("Peer Stream updated:", peerStreamRef.current);
  }, [peerStreamRef.current]);

  useEffect(() => {
    socket.on("incomingCall", handleIncomingCall);
    socket.on("callEnded", destroyConnection);

    return () => {
      socket.off("incomingCall", handleIncomingCall);
      socket.off("callEnded", destroyConnection);
    };
  }, []);

  const setupStream = async () => {
    try {
      if (!streamRef.current) {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = newStream;
        console.log("Stream initialized:", newStream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = newStream;
        }
      }
    } catch (error) {
      console.error("Error initializing stream:", error);
    }
  };

  const answerCall = async () => {
    try {
      console.log("Answering call");
      setIsCallAccepted(true);
      console.log("Stream passed to SimplePeer:", streamRef.current);

      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: streamRef.current,
        config: {
            // iceServers: [
            //   { urls: "stun:stun.l.google.com:19302" },
            //   { urls: "stun:stun.l.google.com:5349" },
            //   { urls: "stun:stun2.l.google.com:19302" },
            //   { urls: "stun:stun4.l.google.com:19302" },
            // ],
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
              { urls: 'stun:stun2.l.google.com:19302' },
              { urls: 'stun:stun3.l.google.com:19302' },
              { urls: 'stun:stun4.l.google.com:19302' },
              {
                url: 'turn:turn.bistri.com:80',
                credential: 'homeo',
                username: 'homeo',
              },
              {
                url: 'turn:turn.anyfirewall.com:443?transport=tcp',
                credential: 'webrtc',
                username: 'webrtc',
              },
            ]
        },
      });
      peer.on("signal", (data) => {
        socket.emit("answerCall", {
          signalData: data,
          to: incomingCallInfo?.callerData?.user_id,
        });
      });

      peer.on("stream", (remoteStream) => {
        console.log("Remote stream tracks:", remoteStream);
        peerVideoRef.current.srcObject = remoteStream;
        peerStreamRef.current = remoteStream;
      });
      peer.on("iceStateChange", (state) => {
        console.log("ICE State Change:", state);
      });

      console.log("INCOMING PER", incomingCallInfo.signalData);

      peer.signal(incomingCallInfo.signalData);
      connectionRef.current = peer;
    } catch (error) {
      console.log("Error in answer call", error);
    }
  };

  const initiateCall = (receiver_id) => {
    try {
      console.log("Call Initiated with ", receiver_id);
      if (receiver_id) {
        console.log("Stream passed to SimplePeer:", streamRef.current);
        const peer = new SimplePeer({
          initiator: true,
          trickle: false,
          stream: streamRef.current,
          config: {
            // iceServers: [
            //   { urls: "stun:stun.l.google.com:19302" },
            //   { urls: "stun:stun.l.google.com:5349" },
            //   { urls: "stun:stun2.l.google.com:19302" },
            //   { urls: "stun:stun4.l.google.com:19302" },
            // ],
            iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    {
      url: 'turn:turn.bistri.com:80',
      credential: 'homeo',
      username: 'homeo',
    },
    {
      url: 'turn:turn.anyfirewall.com:443?transport=tcp',
      credential: 'webrtc',
      username: 'webrtc',
    },
  ]
          },
        });
        peer.on("signal", (signalData) => {
          socket.emit("initiateCall", {
            receiver_id,
            signalData,
            from: socket.id,
            callerName: callInitiatorData?.full_name,
            callerAvatar: callInitiatorData?.avatar,
            callerUserId: callInitiatorData?.user_id,
          });
        });
        peer.on("stream", (remoteStream) => {
          console.log("Remote stream tracks:", remoteStream);
          peerVideoRef.current.srcObject = remoteStream;
          peerStreamRef.current = remoteStream;
          // peerVideoRef.current.play().catch((error) => {
          //   console.error("Error playing video:", error);
          // });
        });
        peer.on("iceStateChange", (state) => {
          console.log("ICE State Change:", state);
        });

        socket.on("callAccepted", ({ signalData }) => {
          console.log("ACCEPTEDDDDDD", signalData);
          setIsCallAccepted(true);
          peer.signal(signalData);
        });
        connectionRef.current = peer;
      }
    } catch (error) {
      // toast.error("Error in initiate call");
      console.log("Error in initiate call", error);
    }
  };

  const destroyConnection = (connectionRef) => {
    connectionRef.current?.destroy();
    // window.location.reload();
  };

  const startCall = async (receiver_id) => {
    await setupStream();
    initiateCall(receiver_id);
  };

  const endCall = async (incomingCallInfo) => {
    try {
      setIsVideoOff(true);
      setIsMuted(true);
      setIsVisible(false);
      setIsFullScreen(false);
      setCallerData(null);
  
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop(); 
        });
        streamRef.current = null; 
      }
  
      destroyConnection(connectionRef);
  
      if (incomingCallInfo?.from) {
        socket.emit("endCall", { to: incomingCallInfo.from });
      }
    } catch (error) {
      console.log("Error in end call", error);
    }
  };
  
  const handleIncomingCall = ({ from, signalData, callerData }) => {
    console.log("Incoming call from:", from, signalData);
    setIncomingCallInfo({
      isSomeoneCalling: true,
      from,
      signalData,
      callerData,
    });
    setIsCallPopupOpen(true);
  };

  const toggleVideo = () => {
    const videoTrack = streamRef.current
      ?.getTracks()
      .find((track) => track.kind === "video");
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };

  const toggleAudio = () => {
    const audioTrack = streamRef.current
      ?.getTracks()
      .find((track) => track.kind === "audio");
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  return (
    <CallContext.Provider
      value={{
        //* === REFS === *//
        myVideoRef,
        peerVideoRef,
        connectionRef,
        streamRef,
        peerStreamRef,

        //* === STATES === *//
        isFullScreen,
        setIsFullScreen,
        isVisible,
        setIsVisible,
        isMuted,
        setIsMuted,
        isVideoOff,
        setIsVideoOff,
        callerData,
        setCallerData,
        isCallAccepted,
        setIsCallAccepted,
        isCallPopupOpen,
        setIsCallPopupOpen,
        incomingCallInfo,
        setIncomingCallInfo,
        callInitiatorData,
        setCallInitiatorData,

        // * === ACTIONS === *//
        setupStream,
        startCall,
        endCall,
        handleIncomingCall,
        answerCall,
        destroyConnection,
        toggleAudio,
        toggleVideo,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

const useCallContext = () => useContext(CallContext);

export default useCallContext;
