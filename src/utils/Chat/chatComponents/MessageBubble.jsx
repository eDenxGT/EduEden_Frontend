/* eslint-disable react/prop-types */
import { UserAvatar } from "./UserAvatar"
import moment from "moment"

export function MessageBubble({ message, receiver, sender, isOwn }) {
  return (
    <div className={`flex items-start gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <UserAvatar user={isOwn ? sender : receiver} size="md" />
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-md min-w-fit px-3 py-2 max-w-[70%] text-sm ${
          isOwn 
            ? 'bg-orange-500 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <p>{message?.message_text}</p>
        </div>
        <span className="text-[10px] text-muted-foreground mt-1">
          {message?.time_stamp && moment(message?.time_stamp).fromNow()}
        </span>
      </div>
    </div>
  )
}

