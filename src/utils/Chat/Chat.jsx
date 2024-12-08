/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import socket from "@/Services/Socket.js";
import { Sidebar } from "./chatComponents/Sidebar";
import { ChatHeader } from "./chatComponents/ChatHeader";
import { ChatArea } from "./chatComponents/ChatArea";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat, fetchChatsByUserId } from "@/store/thunks/chatThunks";

export function Chat({ role }) {
	const {chats, activeChat} = useSelector((state) => state.chat);
	const [conversations, setConversations] = useState([]);
	const [activeConversation, setActiveConversation] = useState(activeChat || null);
	const [messages, setMessages] = useState([]);
	const dispatch = useDispatch();
	const { tutorData } = useSelector((state) => state.tutor);
	const { studentData } = useSelector((state) => state.student);

	useEffect(() => {
		socket.on("receive-message", (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.off("receive-message");
		};
	}, []);

	const fetchChats = useCallback(async () => {
		try {
			console.log("Fetching Students");
			const user_id =
				role === "student"
					? studentData.user_id
					: role === "tutor"
					? tutorData.user_id
					: null;

			await dispatch(fetchChatsByUserId({ user_id, role })).unwrap();
		} catch (error) {
			console.error("Failed to fetch students:", error);
		}
	}, [dispatch, role, studentData?.user_id, tutorData?.user_id]);
  const handleCreateNewChat = async (user_id) => {
    try {
      const newChatDetails = {
        student_id: user_id,
        tutor_id: tutorData?.user_id,
      };
      await dispatch(createNewChat(newChatDetails)).unwrap();
      await dispatch(fetchChatsByUserId({ user_id: tutorData?.user_id, role })).unwrap();
    } catch (error) {
      console.log("Create new chat error:", error);
    }
  };

	useEffect(() => {
		if (tutorData?.user_id || studentData?.user_id) {
			fetchChats();
		}
	}, [fetchChats, tutorData?.user_id, studentData?.user_id, dispatch]);
  useEffect(()=> {
    setConversations(chats)
    console.log(chats)
  }, [chats])
	const handleSendMessage = (text) => {
		const message = {
			id: Date.now(),
			userId: 2,
			text,
			timestamp: new Date().toISOString(),
		};
		console.log(message);

		socket.emit("send-message", {
			recipientId: activeConversation.user.id,
			message: message.text,
		});

		setMessages((prevMessages) => [...prevMessages, message]);
	};

	const handleSelectConversation = (conversation) => {
		setActiveConversation(conversation);
		// Fetch messages for the selected conversation
	};


	return (
		<div className="flex h-[calc(100vh-4rem)] bg-white">
			{/* <Sidebar
				conversations={conversations}
				activeConversation={activeConversation}
				onSelectConversation={(conversation) => {
					setActiveConversation(conversation);
					// Fetch messages for the selected conversation
				}}
			/> */}
			<Sidebar
				conversations={conversations}
				activeConversation={activeConversation}
				onSelectConversation={handleSelectConversation}
				onCreateNewChat={handleCreateNewChat}
			/>
			<div className="flex flex-1 flex-col">
				<ChatHeader conversation={activeConversation} />
				<ChatArea
					conversation={activeConversation}
					messages={messages}
					onSendMessage={handleSendMessage}
				/>
			</div>
		</div>
	);
}
