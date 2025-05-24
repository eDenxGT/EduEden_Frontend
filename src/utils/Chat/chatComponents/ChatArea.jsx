/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import EmojiPicker from "emoji-picker-react";

export function ChatArea({
  messages,
  onSendMessage,
  conversation,
  role,
  senderDetails,
}) {
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const filteredMessages = messages?.filter(
    (message) => message.chat_id === conversation?._id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (text) {
      onSendMessage(text);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEmojiClick = (emojiObject) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const isButtonDisabled =
    inputValue.trim() === "" ||
    inputValue.length > 100 ||
    conversation === null;

  return (
    <div className="flex flex-col h-[calc(100vh-133px)] max-h-[calc(100vh-133px)] bg-gray-50">
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        {conversation === null ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-center">Select a conversation</p>
          </div>
        ) : filteredMessages?.length === 0 ? (
          <div className="flex items-center justify-center h-full ">
            <p className="text-gray-400 text-center">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-4 overflow-hidden">
            {filteredMessages?.map((message) => (
              <MessageBubble
                key={message.message_id}
                message={message}
                isOwn={
                  message.receiver_id ===
                  (role === "student"
                    ? conversation?.tutor_id
                    : conversation?.student_id)
                }
                conversation={conversation}
                receiver={
                  conversation?.userDetails?.[0] || conversation?.userDetails
                }
                sender={{ ...senderDetails }}
              />
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="border-t bg-white p-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleEmojiPicker}
            >
              <Smile className="h-5 w-5" />
              <span className="sr-only">Add emoji</span>
            </Button>
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a message"
            className="flex-1 bg-gray-100 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            size="sm"
            className="bg-green-500 hover:bg-green-600 transition-colors rounded-full p-2"
            disabled={isButtonDisabled}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
