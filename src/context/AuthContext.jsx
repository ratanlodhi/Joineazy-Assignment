import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser, setCurrentUser as saveCurrentUser, initializeLocalStorage } from '../utils/localStorage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLocalStorage();
    const user = getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    saveCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    isLoading,
    isAuthenticated: !!currentUser,
    isStudent: currentUser?.role === 'STUDENT',
    isAdmin: currentUser?.role === 'ADMIN'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
