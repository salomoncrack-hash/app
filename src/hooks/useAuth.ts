import { useState, useCallback } from 'react';
import type { User, LoginCredentials, RegisterData } from '@/types';

const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@animecasino.com',
    role: 'admin',
    isPremium: true,
    balance: 10000,
    createdAt: new Date(),
  },
  {
    id: '2',
    username: 'demo',
    email: 'demo@animecasino.com',
    role: 'user',
    isPremium: false,
    balance: 1000,
    createdAt: new Date(),
  },
];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === credentials.email && credentials.password === 'password'
    );
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      username: data.username,
      email: data.email,
      role: data.role,
      isPremium: data.role === 'admin',
      balance: data.role === 'admin' ? 5000 : 1000,
      createdAt: new Date(),
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const upgradeToPremium = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUser({
      ...user,
      isPremium: true,
      role: 'admin',
    });
    
    setIsLoading(false);
    return true;
  }, [user]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    upgradeToPremium,
  };
}
