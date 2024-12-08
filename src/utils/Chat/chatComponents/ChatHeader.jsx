import { Video, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { UserAvatar } from "./UserAvatar"

export function ChatHeader({ conversation }) {
  return (
    <div className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-3">
        <UserAvatar user={conversation?.user} size="md" />
        <div>
          <h3 className="font-semibold text-sm">{conversation?.user?.name}</h3>
          <p className="text-xs text-muted-foreground">
            {conversation?.user?.isOnline ? "Active Now" : conversation?.user?.lastSeen}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

