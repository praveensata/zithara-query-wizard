
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessageImproved: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  const formattedTime = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  
  return (
    <div className={cn(
      "flex items-start gap-2 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 border bg-zithara-100">
          <span className="text-zithara-700 font-semibold">Z</span>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-xl px-4 py-2 shadow-sm",
        isUser ? "chat-message-user rounded-tr-none" : "chat-message-bot rounded-tl-none"
      )}>
        <div className="whitespace-pre-wrap">{message}</div>
        {timestamp && (
          <div className={cn(
            "text-xs mt-1 text-right",
            isUser ? "text-zithara-100" : "text-gray-500 dark:text-gray-400"
          )}>
            {formattedTime}
          </div>
        )}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 border bg-zithara-50">
          <span className="text-zithara-700 font-semibold">U</span>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessageImproved;
