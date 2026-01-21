import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, databaseService } from '../services/database';
import { trackEvent } from '../components/GoogleAnalytics';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const token = localStorage.getItem('rm_groups_token');
      const userId = localStorage.getItem('rm_groups_user_id');

      if (token && userId) {
        // Use the new session validation method
        const userData = await databaseService.validateSession(token);
        if (userData) {
          setUser(userData);
          
          // Track session restoration
          if (typeof window !== 'undefined' && window.gtag) {
            trackEvent('session_restored', 'Authentication', 'Auto Login');
          }
        } else {
          // Invalid session, clear storage
          localStorage.removeItem('rm_groups_token');
          localStorage.removeItem('rm_groups_user_id');
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
      // Clear invalid data
      localStorage.removeItem('rm_groups_token');
      localStorage.removeItem('rm_groups_user_id');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      const response = await databaseService.loginUser(email, password);

      if (response.success && response.user && response.token) {
        setUser(response.user);
        localStorage.setItem('rm_groups_token', response.token);
        localStorage.setItem('rm_groups_user_id', response.user.id);

        // Track successful login
        if (typeof window !== 'undefined' && window.gtag) {
          trackEvent('user_login_success', 'Authentication', 'Login Success');
        }
      } else {
        // Track failed login
        if (typeof window !== 'undefined' && window.gtag) {
          trackEvent('user_login_failed', 'Authentication', 'Login Failed');
        }
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      const response = await databaseService.registerUser(userData);

      if (response.success && response.user && response.token) {
        setUser(response.user);
        localStorage.setItem('rm_groups_token', response.token);
        localStorage.setItem('rm_groups_user_id', response.user.id);

        // Track successful registration
        if (typeof window !== 'undefined' && window.gtag) {
          trackEvent('user_registration_success', 'Authentication', 'Registration Success');
        }
      } else {
        // Track failed registration
        if (typeof window !== 'undefined' && window.gtag) {
          trackEvent('user_registration_failed', 'Authentication', 'Registration Failed');
        }
      }

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (user) {
      const token = localStorage.getItem('rm_groups_token');
      if (token) {
        // Clear session from database
        await databaseService.logoutUser(user.id, token);
      }
    }
    
    setUser(null);
    localStorage.removeItem('rm_groups_token');
    localStorage.removeItem('rm_groups_user_id');

    // Track logout
    if (typeof window !== 'undefined' && window.gtag) {
      trackEvent('user_logout', 'Authentication', 'User Logout');
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      const success = await databaseService.updateUserProfile(user.id, updates);
      
      if (success) {
        // Update local user state
        setUser(prevUser => prevUser ? { ...prevUser, ...updates } : null);
        
        // Track profile update
        if (typeof window !== 'undefined' && window.gtag) {
          trackEvent('profile_updated', 'User Profile', 'Profile Update');
        }
      }

      return success;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const refreshUser = async () => {
    if (!user) return;

    try {
      const userData = await databaseService.getUserById(user.id);
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('User refresh error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;