/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "./UserAvatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentsByTutorId,
  getTutorsByStudentId,
} from "@/store/thunks/chatThunks";
import moment from "moment";

export function Sidebar({
  onCreateNewChat,
  onSelectConversation,
  conversations,
  activeConversation,
  role,
  senderData,
}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { availableUsersToChat } = useSelector((state) => state?.chat);

  const fetchUsers = useCallback(async () => {
    try {
      console.log("Fetching Students");
      if (role === "student") {
        await dispatch(getTutorsByStudentId(senderData.user_id)).unwrap();
      } else if (role === "tutor") {
        await dispatch(getStudentsByTutorId(senderData.user_id)).unwrap();
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  }, [dispatch, senderData?.user_id, role]);

  useEffect(() => {
    if (senderData?.user_id) {
      fetchUsers();
    }
  }, [fetchUsers, senderData?.user_id]);

  const onUserSelectConversation = (conversation) => {
    if (activeConversation?._id === conversation?._id) return;
    onSelectConversation(conversation);
  };

  const onSelectNewUserChat = (user_id) => {
    setOpen(false);
    onCreateNewChat(user_id);
  };

  return (
    <div className="flex h-full w-64 flex-col border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[46px] px-0"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">New chat</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search users..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup>
                    {availableUsersToChat?.map((user) => (
                      <CommandItem
                        key={user?.user_id}
                        value={user?.full_name}
                        onSelect={() => {
                          console.log("Selected user:", user);
                          onSelectNewUserChat(user?.user_id);
                        }}
                      >
                        <div className="flex items-center">
                          <UserAvatar user={user} size="md" />
                          <span className="ml-2">{user.full_name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations?.map((conversation, index) => (
            <button
              key={conversation?._id || index}
              onClick={() => onUserSelectConversation(conversation)}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                activeConversation?._id === conversation?._id
                  ? "bg-orange-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <UserAvatar
                user={conversation?.userDetails?.[0]}
                status={"enabled"}
                isOnline={
                  role === "student"
                    ? conversation?.tutor_is_online
                    : role === "tutor"
                    ? conversation?.student_is_online
                    : null
                }
                size="m"
              />
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm truncate mr-2">
                      {conversation?.userDetails?.[0]?.full_name.slice(0, 14)+"..."}
                    </span>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation?.last_message?.message_text &&
                      conversation?.last_message?.sender_id ===
                        senderData?.user_id
                        ? "You: "
                        : ""}
                      {conversation?.last_message?.message_text
                        ? conversation.last_message.message_text.length > 15
                          ? conversation.last_message.message_text.substring(
                              0,
                              15
                            ) + "..."
                          : conversation.last_message.message_text
                        : "No messages yet"}
                    </p>
                  </div>
                  <div className="flex flex-col  items-end ml-2 flex-shrink-0">
                    <span
                      className={`text-xs  ${
                        role === "tutor"
                          ? conversation?.unread_message_count?.tutor === 0
                            ? "text-gray-500 mb-4 "
                            : "text-orange-500 font-semibold"
                          : role === "student"
                          ? conversation?.unread_message_count?.student === 0
                            ? "text-gray-500 mb-4 "
                            : "text-orange-500 font-semibold"
                          : null
                      }`}
                    >
                      {conversation?.last_message?.time_stamp &&
                        moment(conversation?.last_message?.time_stamp).format(
                          "h:mm A"
                        )}
                    </span>
                    {role === "tutor" ? (
                      conversation?.unread_message_count?.tutor > 0 && (
                        <span className="bg-orange-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center mt-1">
                          {conversation?.unread_message_count?.tutor}
                        </span>
                      )
                    ) : role === "student" ? (
                      conversation?.unread_message_count?.student > 0 && (
                        <span className="bg-orange-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center mt-1">
                          {conversation?.unread_message_count?.student}
                        </span>
                      )
                    ) : (
                      <div className="bg-transparent px-1.5 py-2"></div>
                    )}

                    {/* {conversation?.unread_message_count > 0 &&
                    conversation?.last_message?.sender_id !==
                      senderData?.user_id ? (
                      <span className="bg-orange-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center mt-1">
                        {conversation?.unread_message_count}
                      </span>
                    ) : (
                      <div className="bg-transparent px-1.5 py-2"></div>
                    )} */}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
