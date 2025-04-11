
import React from 'react';

const EmptyChatState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="text-3xl font-bold text-blue-500 mb-2">AI Assistant</div>
      <p className="text-gray-500 max-w-md">
        Ask me anything! I'm here to help with your questions and provide information on any topic.
      </p>
    </div>
  );
};

export default EmptyChatState;
