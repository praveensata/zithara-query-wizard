
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { saveChatMessage, getUserChatHistory } from '@/lib/firebase';
import { getChatResponse } from '@/lib/gemini';
import { useToast } from '@/components/ui/use-toast';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import LoadingState from './LoadingState';
import EmptyChatState from './EmptyChatState';
import ExampleQueryListener from './ExampleQueryListener';

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
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadChatHistory();
  }, [currentUser]);

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

  const handleSendMessage = useCallback(async (message: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue the conversation.",
        variant: "destructive"
      });
      return;
    }

    if (isTyping) return; // Prevent multiple messages while waiting

    const userMessage: ChatMessage = {
      message: message,
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
  }, [currentUser, isTyping, toast]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="flex flex-col h-full">
      <ExampleQueryListener onQuerySelected={handleSendMessage} />
      
      {chatHistory.length === 0 ? (
        <EmptyChatState />
      ) : (
        <ChatHistory messages={chatHistory} />
      )}
      
      {isTyping && <TypingIndicator />}
      
      <div className="p-4 border-t">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isTyping}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
