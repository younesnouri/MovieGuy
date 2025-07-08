import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: '', auth: false }); // Initialize with false for simplicity

  const login = (username) => {
    setUser({ username, auth: true });
    
  };

  const logout = () => {
    
    setUser({ username: '', auth: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
