import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from './components/axiosConfig';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const response = await axios.get('/users/verify', { withCredentials: true });
        if (response.status === 200) {
          setCurrentUser(response.data);
        }
      } catch (error) {
        setCurrentUser(null);
      }
    };

    verifyUserSession();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
