
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await signIn(email, password);
      navigate('/chat');
      
      toast({
        title: "Success",
        description: "You have successfully signed in."
      });
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Failed to sign in. Please check your credentials.";
      if (error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a 
                href="#" 
                className="text-sm text-zithara-600 hover:text-zithara-700"
                onClick={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Password Reset",
                    description: "This feature is not yet implemented."
                  });
                }}
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-zithara-500 hover:bg-zithara-600" 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <a 
            href="/register" 
            className="text-zithara-600 hover:text-zithara-700 font-medium"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
