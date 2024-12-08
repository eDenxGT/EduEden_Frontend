import { Video, MoreVertical, UserCircle, Ban, Flag, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { UserAvatar } from "./UserAvatar"
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export function ChatHeader() {
  const {
    students,
    chats: conversations,
    activeChat,
  } = useSelector((state) => state?.chat);
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    setConversation(conversations.find((conversation) => conversation._id === activeChat));
    console.log(conversation);
  }, [conversations, activeChat]);

  return (
    <div className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-3">
        <UserAvatar user={conversation?.userDetails?.[0]} size="md" />
        <div>
          <h3 className="font-semibold text-sm">{conversation?.userDetails?.[0]?.full_name}</h3>
          <p className="text-xs text-muted-foreground">
            {conversation?.userDetails?.[0]?.isOnline ? "Active Now" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Video className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Ban className="mr-2 h-4 w-4" />
              <span>Block User</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Flag className="mr-2 h-4 w-4" />
              <span>Report User</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Chat</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

