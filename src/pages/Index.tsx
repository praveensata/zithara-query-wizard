
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-gray-900 dark:text-white">Powered by </span>
                <span className="text-blue-500">AI Assistant</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Get instant answers to any question with our advanced AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg h-auto"
                  onClick={() => navigate('/chat')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Chatting Now
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-6 text-lg h-auto"
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        AI
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">AI Assistant</p>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Hello! I'm your AI assistant. How can I help you today?</p>
                    </div>
                    <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%] ml-auto">
                      <p className="text-sm">What can you tell me about quantum computing?</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Quantum computing uses quantum mechanics principles like superposition and entanglement to process information. Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously, potentially solving complex problems much faster.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 mb-4">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Natural Conversations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interact with our AI assistant using natural language, just like talking to a knowledgeable friend.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Answers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get immediate responses to your questions on any topic with internet-powered search capabilities.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your conversations are secure and your data is handled with the highest privacy standards.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Try our AI assistant now and experience the future of knowledge at your fingertips.
          </p>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg h-auto"
            onClick={() => navigate('/chat')}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start Chatting
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-2">
                AI
              </div>
              <span className="text-lg font-bold">AI Assistant</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} AI Assistant. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
