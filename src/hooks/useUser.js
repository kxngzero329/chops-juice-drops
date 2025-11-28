// hooks/useUser.js
import { useState, useEffect } from 'react';
import { UserManager } from '../utils/userManager';

export const useUser = () => {
  const [userManager] = useState(() => new UserManager());
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = userManager.getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);
  }, [userManager]);

  const register = async (userData) => {
    try {
      const user = userManager.register(userData);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const user = userManager.login(email, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    userManager.logout();
    setCurrentUser(null);
  };

  return {
    currentUser,
    isLoading,
    register,
    login,
    logout,
    userManager
  };
};