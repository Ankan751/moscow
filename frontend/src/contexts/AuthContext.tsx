import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: null;
  token: null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Since public site has no login, we ensure all auth-related storage is cleared
    localStorage.removeItem('Hanumant Properties_token');
    localStorage.removeItem('Hanumant Properties_user');
    setIsLoading(false);
  }, []);

  const login = async () => {
    throw new Error('Authentication is disabled on this site.');
  };

  const register = async () => {
    throw new Error('Registration is disabled on this site.');
  };

  const logout = () => {
    localStorage.removeItem('Hanumant Properties_token');
    localStorage.removeItem('Hanumant Properties_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
