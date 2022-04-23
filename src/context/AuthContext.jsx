import React, { createContext, useState } from 'react';
export const AuthContext = createContext({});

export const AuthProvider = props => {
  const [user, setUser] = useState({
    isAdmin: false,
    email: '',
    token: '',
    name: '',
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
