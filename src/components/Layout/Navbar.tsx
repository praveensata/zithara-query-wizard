
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, UserCog, LogOut, LogIn, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Navbar: React.FC = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Success",
        description: "You have been signed out."
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zithara-500 text-white font-bold text-lg mr-2">
            Z
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Zithara Query Wizard</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            onClick={() => navigate('/')}
            className={`cursor-pointer text-sm font-medium ${
              location.pathname === '/' 
                ? 'text-zithara-600 dark:text-zithara-400' 
                : 'text-gray-600 hover:text-zithara-600 dark:text-gray-300 dark:hover:text-zithara-400'
            }`}
          >
            Home
          </a>
          <a 
            onClick={() => navigate('/chat')}
            className={`cursor-pointer text-sm font-medium ${
              location.pathname === '/chat' 
                ? 'text-zithara-600 dark:text-zithara-400' 
                : 'text-gray-600 hover:text-zithara-600 dark:text-gray-300 dark:hover:text-zithara-400'
            }`}
          >
            Chat
          </a>
          {userRole === 'admin' && (
            <a 
              onClick={() => navigate('/admin')}
              className={`cursor-pointer text-sm font-medium ${
                location.pathname === '/admin' 
                  ? 'text-zithara-600 dark:text-zithara-400' 
                  : 'text-gray-600 hover:text-zithara-600 dark:text-gray-300 dark:hover:text-zithara-400'
              }`}
            >
              Admin
            </a>
          )}
        </div>
        
        {/* User Area */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-zithara-100 text-zithara-600">
                      {currentUser.displayName ? getInitials(currentUser.displayName) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.displayName || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/chat')}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Chat</span>
                </DropdownMenuItem>
                {userRole === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <UserCog className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                className="hidden md:flex" 
                onClick={() => navigate('/login')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Log in
              </Button>
              <Button 
                className="bg-zithara-500 hover:bg-zithara-600" 
                onClick={() => navigate('/register')}
              >
                <User className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Sign up</span>
                <span className="md:hidden">Sign up</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
