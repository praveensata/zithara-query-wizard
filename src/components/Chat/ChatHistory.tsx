
import React, { useRef, useEffect } from 'react';
import ChatMessageImproved from './ChatMessageImproved';

interface ChatMessage {
  id?: string;
  message: string;
  isUser: boolean;
  timestamp?: any;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-4 chat-container"
    >
      {messages.map((chat, index) => (
        <ChatMessageImproved
          key={chat.id || index}
          message={chat.message}
          isUser={chat.isUser}
          timestamp={chat.timestamp ? new Date(chat.timestamp.seconds * 1000) : undefined}
        />
      ))}
    </div>
  );
};

export default ChatHistory;
