// import useCallContext from "@/contexts/CallProvider";
// import SimplePeer from "simple-peer/simplepeer.min.js";
// import socket from "./Socket";
// import { set } from "lodash";
// // import { toast } from "sonner";

// const initiateCall = (
//   receiver_id,
//   stream,
//   peerVideoRef,
//   connectionRef,
//   setIsCallAccepted
// ) => {
//   try {
//     console.log("Call Initiated with ", receiver_id);
//     if (receiver_id) {
//       const peer = new SimplePeer({
//         initiator: true,
//         trickle: false,
//         stream,
//       });
//       peer.on("signal", (signalData) => {
//         socket.emit("initiateCall", {
//           receiver_id,
//           signalData,
//           from: socket.id,
//         });
//       });
//       peer.on("stream", (stream) => {
//         peerVideoRef.current.srcObject = stream;
//       });
//       peer.on("callAccepted", (signal) => {
//         setIsCallAccepted(true);
//         peer.signal(signal);
//       });
//       connectionRef.current = peer;
//     }
//   } catch (error) {
//     // toast.error("Error in initiate call");
//     console.log("Error in initiate call", error);
//   }
// };

// const destroyConnection = (connectionRef) => {
//     connectionRef.current.destroy();
//     window.location.reload();
//   }


// // const intiateCall = async (receiverId) => {
// //     try {}catch (error) {}
// // }
// // const intiateCall = async (receiverId) => {
// //     try {}catch (error) {}
// // }

// export { initiateCall, answerCall, destroyConnection };
