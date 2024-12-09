/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import socket from "@/Services/Socket.js";
import { Sidebar } from "./chatComponents/Sidebar";
import { ChatHeader } from "./chatComponents/ChatHeader";
import { ChatArea } from "./chatComponents/ChatArea";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewChat,
  fetchChatsByUserId,
  fetchMessagesByChatId,
} from "@/store/thunks/chatThunks";
import { toast } from "sonner";
import { setActiveChat } from "@/store/slices/chatSlice";
import { v4 as uuidv4 } from "uuid";

export function Chat({ role }) {
  const dispatch = useDispatch();

  //* ============== Redux State ============= *//
  const {
    chats,
    activeChat,
    messages: chatMessages,
  } = useSelector((state) => state.chat);
  const { tutorData } = useSelector((state) => state.tutor);
  const { studentData } = useSelector((state) => state.student);

  console.log(chatMessages);

  //* ============== Computed Data ============= *//
  const senderDetails = role === "student" ? studentData : tutorData;
  const sender_id = senderDetails?.user_id;

  //* ============== Local State ============= *//
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(
    activeChat || null
  );

  const [messages, setMessages] = useState(chatMessages || []);

  //* ============== Socket Setup ============= *//
  useEffect(() => {
    socket.on("receive-message", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  //* ============== Fetch Chats ============= *//
  const fetchChats = useCallback(async () => {
    if (!sender_id) return;

    try {
      await dispatch(fetchChatsByUserId({ user_id: sender_id, role })).unwrap();
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  }, [dispatch, role, sender_id]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    setConversations(chats);
  }, [chats]);

  const fetchMessages = useCallback(
    async (chat_id) => {
      try {
        const messages = await dispatch(
          fetchMessagesByChatId(chat_id)
        ).unwrap();
        setMessages(messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation._id);
    }
  }, [activeConversation, fetchMessages]);

  //* ============== Create New Chat ============= *//
  const handleCreateNewChat = async (targetUserId) => {
    if (!sender_id || !targetUserId) return;

    const newChatDetails = {
      student_id: role === "student" ? sender_id : targetUserId,
      tutor_id: role === "tutor" ? sender_id : targetUserId,
    };

    try {
      const newChat = await dispatch(
        createNewChat({ newChatDetails, role })
      ).unwrap();
      setActiveConversation(newChat);

      await fetchChats();
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  //* ============== Handle Send Message ============= *//
  const handleSendMessage = (text) => {
    if (!activeConversation) {
      toast.error("No active conversation selected.");
      return;
    }

    const receiver_id =
      role === "student"
        ? activeConversation?.tutor_id
        : activeConversation?.student_id;

    const message = {
      message_id: uuidv4(),
      sender_id,
      receiver_id,
      message_text: text,
      time_stamp: new Date().toISOString(),
    };

    console.log("Sending message:", message);

    socket.emit("send-message", message);

    setMessages((prevMessages) => [...prevMessages, message]);
  };

  //* ============== Handle Select Conversation ============= *//
  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages(conversation?.messages || []);
    dispatch(setActiveChat(conversation));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      {/* Sidebar Component */}
      <Sidebar
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={handleSelectConversation}
        onCreateNewChat={handleCreateNewChat}
        role={role}
        senderData={senderDetails}
      />

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <ChatHeader role={role} conversation={activeConversation} />
        <ChatArea
          conversation={activeConversation}
          role={role}
          senderDetails={senderDetails}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
