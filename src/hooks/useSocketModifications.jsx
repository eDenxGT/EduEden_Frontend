import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast"; // Adjust based on your project setup
import { fetchChatsByUserId } from "@/store/thunks/chatThunks"; // Adjust thunk path
import socket from "@/Services/Socket"; // Your Socket.IO instance

export const useSocketNotifications = (role, sender_id) => {
  const dispatch = useDispatch();
  const activeConversationRef = useRef(null);

  // Fetch updated chats
  const fetchChats = async () => {
    if (!sender_id) return;
    try {
      await dispatch(fetchChatsByUserId({ user_id: sender_id, role })).unwrap();
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  useEffect(() => {
    // Handle received messages
    const handleReceiveMessage = ({ chatData, ...message }) => {
      if (chatData?._id !== activeConversationRef.current?._id) {
        toast({
          title: `Message from ${role === "student" ? "Tutor" : "Student"}`,
          description: message?.message_text || "New Message",
          duration: 3000,
        });
        fetchChats(); // Refresh chat list
      }
    };

    // Handle user connection updates
    const handleUsersUpdate = (data) => {
      console.log("User disconnected:", data);
      fetchChats();
    };

    // Register socket events
    socket.on("receive-message", handleReceiveMessage);
    socket.on("users-update", handleUsersUpdate);

    // Cleanup listeners
    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("users-update", handleUsersUpdate);
    };
  }, [role, sender_id, dispatch]);

  // Setter for active conversation
  const setActiveConversationRef = (conversation) => {
    activeConversationRef.current = conversation;
  };

  return { setActiveConversationRef };
};
