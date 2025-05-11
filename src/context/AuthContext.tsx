
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (phone: string) => Promise<void>;
  logout: () => void;
  verifyOtp: (otp: string) => Promise<boolean>;
};

type User = {
  name: string;
  phone: string;
  id: string;
  email?: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  const login = async (phone: string) => {
    // Simulate sending OTP
    setPendingPhone(phone);
    toast.success("OTP sent to your WhatsApp number!");
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    // For demo purpose, any 4 digit OTP is valid
    if (otp.length === 4 && pendingPhone) {
      setUser({
        name: "Coffee Lover",
        phone: pendingPhone,
        id: `user-${Date.now().toString(36)}`, // Generate a simple pseudo ID
        email: "user@example.com" // Add a default email
      });
      setIsAuthenticated(true);
      setPendingPhone(null);
      toast.success("Login successful!");
      return true;
    }
    toast.error("Invalid OTP, please try again.");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast.info("You've been logged out.");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, verifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
