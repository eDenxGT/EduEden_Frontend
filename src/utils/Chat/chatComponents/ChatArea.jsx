import { useEffect, useRef } from "react"
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "./MessageBubble"

export function ChatArea({ conversation, messages, onSendMessage }) {
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

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
    const text = inputRef.current.value.trim()
    if (text) {
      onSendMessage(text)
      inputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScrollArea ref={scrollRef} className="flex-1 p-3">
        <div className="space-y-3 ">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              user={conversation.user}
              isOwn={message.userId !== conversation.user.id}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            ref={inputRef}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Send className="h-3 w-3" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

