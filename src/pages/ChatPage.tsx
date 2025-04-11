
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ChatInterface from '@/components/Chat/ChatInterface';
import ChatSidebar from '@/components/Chat/ChatSidebar';
import Navbar from '@/components/Layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ChatPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-6">
        {!currentUser ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold mb-4">Sign in to start chatting</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Create an account or sign in to access the AI Assistant.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600" 
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
            <div className="md:col-span-3 h-full">
              <Card className="h-full shadow-md">
                <CardContent className="p-0 h-full">
                  <ChatInterface />
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-1">
              <ChatSidebar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
