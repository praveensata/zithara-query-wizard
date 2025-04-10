
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
        <Avatar className="h-8 w-8 border bg-blue-100">
          <AvatarFallback className="text-blue-700 font-semibold">AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-xl px-4 py-2 shadow-sm",
        isUser ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none"
      )}>
        <div className="whitespace-pre-wrap">{message}</div>
        {timestamp && (
          <div className={cn(
            "text-xs mt-1 text-right",
            isUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
          )}>
            {formattedTime}
          </div>
        )}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 border bg-blue-50">
          <AvatarFallback className="text-blue-700 font-semibold">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessageImproved;
