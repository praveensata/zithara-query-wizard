
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, CheckCircle, ShieldCheck, RefreshCw } from 'lucide-react';
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
                <span className="text-gray-900 dark:text-white">AI-Powered </span>
                <span className="text-zithara-500">Customer Support</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Get instant answers about products, orders, and policies with our AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-zithara-500 hover:bg-zithara-600 text-white px-8 py-6 text-lg h-auto"
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
                      <div className="w-10 h-10 rounded-full bg-zithara-100 flex items-center justify-center text-zithara-600 font-bold">
                        Z
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Zithara Assistant</p>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Hello! Welcome to Zithara. How can I help you today?</p>
                    </div>
                    <div className="bg-zithara-500 text-white rounded-lg p-3 max-w-[80%] ml-auto">
                      <p className="text-sm">Do you have the ZitharaPhone Pro in stock?</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Yes, the ZitharaPhone Pro is currently in stock! It's available in Black, Silver, and Blue. Would you like me to provide more details about its features?</p>
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
              <div className="w-12 h-12 rounded-full bg-zithara-100 dark:bg-zithara-900 flex items-center justify-center text-zithara-500 mb-4">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Natural Conversations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interact with our AI assistant just like you would with a human agent, using natural language.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-zithara-100 dark:bg-zithara-900 flex items-center justify-center text-zithara-500 mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Answers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get immediate responses to your questions about products, shipping, returns, and company policies.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-zithara-100 dark:bg-zithara-900 flex items-center justify-center text-zithara-500 mb-4">
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
      <section className="py-16 bg-zithara-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Try our AI assistant now and experience the future of customer support.
          </p>
          <Button 
            className="bg-zithara-500 hover:bg-zithara-600 text-white px-8 py-6 text-lg h-auto"
            onClick={() => navigate('/chat')}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Start Chatting
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-zithara-500 flex items-center justify-center text-white font-bold text-sm mr-2">
                Z
              </div>
              <span className="text-lg font-bold">Zithara</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Zithara AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
