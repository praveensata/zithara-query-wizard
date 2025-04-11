
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Lightbulb, Sparkles, Search, RefreshCcw, Clock } from 'lucide-react';

const ChatSidebar: React.FC = () => {
  const exampleQueries = [
    "What are the latest advancements in AI?",
    "How does quantum computing work?",
    "Explain blockchain in simple terms",
    "Tips for improving productivity"
  ];

  const handleQueryClick = (query: string) => {
    // Create a custom event to communicate with the chat interface
    const event = new CustomEvent('example-query', { detail: query });
    window.dispatchEvent(event);
  };

  return (
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
              Try Asking
            </h4>
            <div className="space-y-2">
              {exampleQueries.map((query, index) => (
                <button 
                  key={index}
                  onClick={() => handleQueryClick(query)}
                  className="text-sm p-2 w-full text-left rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h4 className="font-medium mb-2 flex items-center">
              <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
              Capabilities
            </h4>
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <Clock className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                <span>Real-time responses with internet access</span>
              </li>
              <li className="flex items-start">
                <RefreshCcw className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                <span>Conversation history is saved automatically</span>
              </li>
              <li className="flex items-start">
                <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                <span>Advanced AI powered by Google's Gemini</span>
              </li>
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
  );
};

export default ChatSidebar;
