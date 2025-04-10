
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ChatInterface from '@/components/Chat/ChatInterface';
import Navbar from '@/components/Layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ChatPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [apiKey, setApiKey] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // This is just a placeholder - in a real application, you'd load from environment variables
    // or Supabase secrets, not localStorage. But for demo purposes:
    const savedApiKey = localStorage.getItem('geminiApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      // For demo purposes, set a placeholder key
      setApiKey("YOUR_API_KEY");
    }
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    localStorage.setItem('geminiApiKey', newKey);
    
    toast({
      title: "API Key Updated",
      description: "Your Gemini API key has been saved."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-6">
        {!currentUser ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold mb-4">Sign in to start chatting</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Create an account or sign in to access the Zithara AI chat assistant.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-zithara-500 hover:bg-zithara-600" 
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            <div className="md:col-span-2 h-full">
              <Card className="h-full">
                <CardContent className="p-0 h-full">
                  <ChatInterface apiKey={apiKey} />
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-1">
              <Card className="h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-4">Settings</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                        Gemini API Key
                      </label>
                      <Input
                        id="apiKey"
                        type="password"
                        placeholder="Enter your Gemini API key"
                        value={apiKey}
                        onChange={handleApiKeyChange}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Your API key is stored locally and never sent to our servers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <h4 className="font-medium mb-2">Quick Tips</h4>
                    <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Ask about product specifications</li>
                      <li>• Inquire about shipping and delivery</li>
                      <li>• Learn about return and refund policies</li>
                      <li>• Get general information about Zithara</li>
                    </ul>
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
