
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-2 mb-4">
      <Avatar className="h-8 w-8 border bg-blue-100">
        <AvatarFallback className="text-blue-700 font-semibold">AI</AvatarFallback>
      </Avatar>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-xl rounded-tl-none px-4 py-3 shadow-sm">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
