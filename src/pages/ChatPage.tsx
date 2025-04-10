
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ChatInterface from '@/components/Chat/ChatInterface';
import Navbar from '@/components/Layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Lightbulb, History, Search } from 'lucide-react';

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
              <Card className="h-full shadow-md">
                <CardContent className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
                    AI Assistant
                  </h3>
                  
                  <div className="space-y-6 mt-4">
                    <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Lightbulb className="mr-2 h-4 w-4 text-blue-500" />
                        Quick Ideas
                      </h4>
                      <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• Ask about any topic or concept</li>
                        <li>• Get help with problem-solving</li>
                        <li>• Find information on current events</li>
                        <li>• Request explanations in simple terms</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <h4 className="font-medium mb-2 flex items-center">
                        <History className="mr-2 h-4 w-4 text-blue-500" />
                        Features
                      </h4>
                      <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• Chat history saved automatically</li>
                        <li>• Powered by Gemini AI technology</li>
                        <li>• Internet search capability</li>
                        <li>• Real-time responses</li>
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <Button variant="outline" className="w-full" onClick={() => window.open('https://ai.google.dev/', '_blank')}>
                        <Search className="mr-2 h-4 w-4" />
                        Learn More About AI
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
