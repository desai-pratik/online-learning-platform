import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const signup = (username, email, password, role) => {
    const newUser = { username, email, password, role };
    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email && user.password === password);

    if (existingUser) {
      localStorage.setItem('currentUser', JSON.stringify(existingUser));
      setUser(existingUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    toast.info('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
