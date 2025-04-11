
import React from 'react';

const EmptyChatState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="text-3xl font-bold text-blue-500 mb-2">AI Assistant</div>
      <p className="text-gray-500 max-w-md mb-2">
        How can I help you today? Ask me any question and I'll provide a clear, concise answer.
      </p>
      <p className="text-sm text-gray-400 max-w-md">
        Try asking about refunds, order status, company policies, or product availability.
      </p>
    </div>
  );
};

export default EmptyChatState;
