/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { Search, Plus, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { getStudentsByTutorId, getTutorsByStudentId } from "@/store/thunks/chatThunks";
import { setActiveChat } from "@/store/slices/chatSlice";

export function Sidebar({
  onCreateNewChat,
  onSelectConversation,
  conversations,
  activeConversation,
  role,
  senderData
}) {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const {
    availableUsersToChat,
  } = useSelector((state) => state?.chat);

  const fetchUsers = useCallback(async () => {
    try {
      console.log("Fetching Students");
      if(role === "student") {
        await dispatch(getTutorsByStudentId(senderData.user_id)).unwrap();
      } else if(role === "tutor") {
        await dispatch(getStudentsByTutorId(senderData.user_id)).unwrap();
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  }, [dispatch, senderData?.user_id]);

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
              key={conversation._id || index}
              onClick={() => onUserSelectConversation(conversation)}
              className={`flex items-start gap-2 w-full p-2 rounded-lg transition-colors ${
                activeConversation?._id === conversation?._id
                  ? "bg-orange-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <UserAvatar user={conversation?.userDetails?.[0]} size="m" />
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">
                    {conversation?.userDetails?.[0]?.full_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {conversation?.lastMessage?.timestamp || ""}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {conversation?.lastMessage?.text || "No messages yet"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
