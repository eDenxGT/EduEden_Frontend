import React, { useEffect, useRef, useState } from "react"
import { Send, Smile } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { MessageBubble } from "./MessageBubble"
import { useSelector } from "react-redux"


export function ChatArea({ messages, onSendMessage }) {
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState("")
  const {
    chats: conversations,
    activeChat,
  } = useSelector((state) => state?.chat)
  const conversation = conversations.find((conversation) => conversation._id === activeChat)

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = inputValue.trim()
    if (text) {
      onSendMessage(text)
      setInputValue("")
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const isButtonDisabled = inputValue.trim() === "";

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        {messages?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-center">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages?.map((message) => (
              <MessageBubble
                key={message._id}
                message={message}
                isOwn={message.sender_id === conversation?.userDetails?.[0]?.user_id}
              />
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="border-t bg-white p-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button 
            type="button" 
            size="sm" 
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            <Smile className="h-5 w-5" />
            <span className="sr-only">Add emoji</span>
          </Button>
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
  )
}

