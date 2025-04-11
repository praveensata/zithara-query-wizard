
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <p className="mt-2 text-gray-500">Getting things ready for you...</p>
    </div>
  );
};

export default LoadingState;
