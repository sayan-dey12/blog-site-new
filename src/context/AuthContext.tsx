'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

/* ---------------- TYPES ---------------- */

export type AuthUser = {
  id: string;
  email: string;
  username: string | null;
  name: string | null;
  image: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string;
};

interface AuthContextType {
  loggedIn: boolean;
  user: AuthUser | null;
  mounted: boolean;
  setLoggedIn: (value: boolean) => void;
}

/* ---------------- CONTEXT ---------------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/me', {
          credentials: 'include',
        });

        if (!res.ok) {
          setLoggedIn(false);
          setUser(null);
          return;
        }

        const data = await res.json();

        setLoggedIn(data.loggedIn);
        setUser(data.user ?? null);
      } catch {
        setLoggedIn(false);
        setUser(null);
      } finally {
        setMounted(true);
      }
    }

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        mounted,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
