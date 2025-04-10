
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Layout/Navbar';
import Dashboard from '@/components/Admin/Dashboard';
import { useToast } from '@/components/ui/use-toast';

const AdminPage: React.FC = () => {
  const { currentUser, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!currentUser || userRole !== 'admin')) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin page.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [currentUser, userRole, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zithara-500"></div>
      </div>
    );
  }

  if (!currentUser || userRole !== 'admin') {
    return null; // Will be redirected by the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-6">
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminPage;
