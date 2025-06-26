
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  referralCode: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and user data
    const storedUser = localStorage.getItem('faluus_user');
    const token = localStorage.getItem('faluus_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock API call - in a real app, this would be an actual API request
      // const response = await api.post('/auth/login', { email, password });
      
      // Mock successful login
      const mockUser: User = {
        id: '123',
        name: 'Demo User',
        email: email,
        phone: '+252612345678',
        balance: 100,
        referralCode: 'DEMO123',
        profilePicture: undefined
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store user data and token
      localStorage.setItem('faluus_user', JSON.stringify(mockUser));
      localStorage.setItem('faluus_token', mockToken);
      
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock API call - in a real app, this would be an actual API request
      // const response = await api.post('/auth/register', { name, email, phone, password });
      
      // Mock successful registration
      const mockUser: User = {
        id: '123',
        name: name,
        email: email,
        phone: phone,
        balance: 0,
        referralCode: 'NEW' + Math.floor(Math.random() * 10000),
        profilePicture: undefined
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store user data and token
      localStorage.setItem('faluus_user', JSON.stringify(mockUser));
      localStorage.setItem('faluus_token', mockToken);
      
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('faluus_user');
    localStorage.removeItem('faluus_token');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('faluus_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};