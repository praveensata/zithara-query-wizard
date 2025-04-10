
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { auth, onAuthStateChanged, getUserRole } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userRole: null,
  loading: true
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const role = await getUserRole(user.uid);
          setUserRole(role);
        } catch (error) {
          console.error("Error getting user role:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
