import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  state?: string;
  ageGroup?: string;
  firstTimeVoter?: boolean;
  movedRecently?: boolean;
  country?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, name: string, extras?: Partial<User>) => void;
  updateProfile: (profile: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('civicguide_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user session', err);
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, name: string, extras: Partial<User> = {}) => {
    const newUser: User = {
      uid: 'user_' + Date.now(),
      displayName: name,
      email: email,
      photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      ...extras
    };
    setUser(newUser);
    localStorage.setItem('civicguide_user', JSON.stringify(newUser));
  };

  const updateProfile = (profile: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...profile };
    setUser(updatedUser);
    localStorage.setItem('civicguide_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civicguide_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
