import { UserAvatar } from "./UserAvatar"

export function MessageBubble({ message, user, isOwn }) {
  return (
    <div className={`flex items-start gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <UserAvatar user={user} size="sm" />
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-md min-w-fit px-3 py-2 max-w-[70%] text-sm ${
          isOwn 
            ? 'bg-orange-500 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <p>{message.text}</p>
        </div>
        <span className="text-[10px] text-muted-foreground mt-1">
          {message.timestamp}
        </span>
      </div>
    </div>
  )
}

