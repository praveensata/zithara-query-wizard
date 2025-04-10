
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { saveChatMessage, getUserChatHistory } from '@/lib/firebase';
import { getChatResponse } from '@/lib/gemini';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import ChatMessageImproved from './ChatMessageImproved';
import { useToast } from '@/components/ui/use-toast';

interface ChatMessage {
  id?: string;
  message: string;
  isUser: boolean;
  timestamp?: any;
}

interface FirebaseChatMessage {
  id: string;
  message?: string;
  isUser?: boolean;
  timestamp?: any;
  [key: string]: any;
}

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadChatHistory = async () => {
      if (currentUser) {
        setIsLoading(true);
        try {
          const history = await getUserChatHistory(currentUser.uid);
          
          if (Array.isArray(history)) {
            const formattedHistory = history.map((item: FirebaseChatMessage) => ({
              id: item.id,
              message: item.message || '',
              isUser: item.isUser || false,
              timestamp: item.timestamp
            }));
            
            setChatHistory(formattedHistory);
          } else {
            console.error("Chat history is not an array:", history);
            toast({
              title: "Error",
              description: "Failed to load chat history format. Please try again.",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error("Error loading chat history:", error);
          toast({
            title: "Error",
            description: "Failed to load chat history. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadChatHistory();
  }, [currentUser, toast]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue the conversation.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: ChatMessage = {
      message: message.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    
    try {
      const savedMsgId = await saveChatMessage(currentUser.uid, userMessage.message, true);
      userMessage.id = savedMsgId;
    } catch (error) {
      console.error("Error saving user message:", error);
    }
    
    setMessage('');
    
    setIsTyping(true);
    
    try {
      // Use the provided API key for this request
      const apiKey = "AIzaSyD1lQqLhc9afbc6MXEDF1u73Wx-uaOqP9M";
      const response = await getChatResponse(userMessage.message, apiKey);
      
      setIsTyping(false);
      
      const botMessage: ChatMessage = {
        message: response.text,
        isUser: false,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, botMessage]);
      
      if (currentUser) {
        const savedBotMsgId = await saveChatMessage(currentUser.uid, botMessage.message, false);
        botMessage.id = savedBotMsgId;
      }
    } catch (error) {
      console.error("Error getting chat response:", error);
      setIsTyping(false);
      
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 chat-container"
      >
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zithara-500"></div>
            <p className="mt-2 text-gray-500">Loading chat history...</p>
          </div>
        ) : chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold text-zithara-500 mb-2">Welcome to Zithara AI</div>
            <p className="text-gray-500 max-w-md">
              Ask me anything about our products, order status, shipping, returns, or company policies.
            </p>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <ChatMessageImproved
              key={chat.id || index}
              message={chat.message}
              isUser={chat.isUser}
              timestamp={chat.timestamp ? new Date(chat.timestamp.seconds * 1000) : undefined}
            />
          ))
        )}
        
        {isTyping && (
          <div className="flex items-start gap-2 mb-4">
            <Avatar className="h-8 w-8 border bg-zithara-100">
              <AvatarFallback className="text-zithara-700 font-semibold">Z</AvatarFallback>
            </Avatar>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl rounded-tl-none px-4 py-3 shadow-sm">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-zithara-500 hover:bg-zithara-600">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
