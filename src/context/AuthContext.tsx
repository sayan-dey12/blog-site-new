'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  mounted: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/me', {
          credentials: 'include', // ✅ required to send cookies
        });
        const data = await res.json();
        setLoggedIn(data.loggedIn);
      } catch {
        setLoggedIn(false);
      } finally {
        setMounted(true); // ✅ auth status checked
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, mounted }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};