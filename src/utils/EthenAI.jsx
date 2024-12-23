import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Smile, Loader2 } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { axiosInstance } from "@/api/axiosConfig";
import { matchPath, useLocation } from "react-router-dom";

const EthenAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  const MAX_MESSAGE_LENGTH = 100;

  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm Ethen AI. How can I assist you today?",
        isUser: false,
      },
    ]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hidePaths = [
    "/student/my-courses/:course_id/quiz/:quiz_id",
    "/student/my-courses/:course_id/quiz/:quiz_id/result",
  ];

  const shouldHide = hidePaths.some((path) => matchPath({ path, end: true }, location.pathname));

  if (shouldHide) {
    return null;
  }

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = inputMessage;
      setMessages([...messages, { text: userMessage, isUser: true }]);
      setInputMessage("");
      setIsLoading(true);

      try {
        const response = await axiosInstance.post("/chats/ethen-ai", {
          message: userMessage,
        });
        // console.log(response);
        if (response.status !== 200) {
          throw new Error("Failed to fetch chatbot response");
        }

        const data = response.data;

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.reply, isUser: false },
        ]);
      } catch (error) {
        console.error("Error fetching chatbot response:", error.message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Something went wrong. Please try again.", isUser: false },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInputMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setInputMessage(value);
      adjustTextareaHeight();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const renderMessage = (message, index) => {
    const isLink = message.text.match(/https?:\/\/[^\s]+/);
    const formattedText = message.text.split("\n")?.map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i !== message.text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));

    return (
      <div
        key={index}
        className={`flex ${
          message.isUser ? "justify-end" : "justify-start"
        } mb-3`}
      >
        <div
          className={`max-w-[70%] sm:max-w-[60%] rounded-xl p-3 shadow-lg ${
            message.isUser
              ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
              : "bg-gray-100 text-gray-800"
          } break-words whitespace-pre-wrap`}
        >
          {isLink ? (
            <div className="flex flex-col">
              <span>{message?.text?.split(/https?:\/\/[^\s]+/)[0]}</span>
              <a
                href={message?.text?.match(/https?:\/\/[^\s]+/)[0]}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline break-all ${
                  message.isUser ? "text-orange-100" : "text-orange-600"
                }`}
              >
                {message?.text?.match(/https?:\/\/[^\s]+/)[0]}
              </a>
            </div>
          ) : (
            formattedText
          )}
        </div>
      </div>
    );
  };

  const chatPaths = [
    "/student/chat",
    "/tutor/chat",
  ];

  const isChatPath = chatPaths.some((path) => matchPath({ path, end: true }, location.pathname));

  return (
    <div ref={chatRef} className={`fixed ${isChatPath ? "bottom-14" : "bottom-4"} right-4 z-50`}>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="rounded-full p-4 shadow-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-[90vw] sm:w-[400px] max-w-[400px]">
          <div className="flex flex-col h-[32rem] max-h-[80vh]">
            <div className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                  <span className="text-orange-500 font-bold text-lg">AI</span>
                </div>
                <div>
                  <h2 className="text-base font-semibold flex items-center">
                    Ethen AI
                    <span className="ml-2 text-xs font-normal bg-orange-700 px-2 py-0.5 rounded-full">
                      Beta
                    </span>
                  </h2>
                  <p className="text-xs text-orange-100">By eDenxGT</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:bg-orange-500/30 transition-colors duration-200 p-2 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-hidden p-0">
              <div className="h-full p-4 overflow-y-auto" ref={scrollAreaRef}>
                {messages.map(renderMessage)}
              </div>
            </div>

            <div className="flex items-start space-x-2 p-4 border-t border-orange-100 bg-orange-50">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-orange-500 hover:text-orange-600 hover:bg-orange-100 transition-colors duration-200 p-2 rounded"
              >
                <Smile size={20} />
              </button>

              <div className="relative flex-grow">
                <textarea
                  ref={inputRef}
                  rows="1"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full p-2 border border-orange-200 rounded focus:border-orange-500 focus:ring-orange-500 transition-all duration-200 resize-none overflow-hidden"
                  style={{ minHeight: "40px", maxHeight: "120px" }}
                />

                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2 z-10">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        width={window.innerWidth < 768 ? 255 : 280}
                        height={400}
                      />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {inputMessage.length}/{MAX_MESSAGE_LENGTH}
                </div>
              </div>

              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 p-2 rounded"
                disabled={isLoading || inputMessage.length === 0}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthenAI;
