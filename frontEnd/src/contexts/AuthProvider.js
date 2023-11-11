// ./contexts/AuthProvider.js
import React, { createContext, useReducer, useContext } from 'react';

export const AuthContext = createContext();

const initialState = {
  userInfo: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };  
    // Handle other authentication-related actions here
    case 'SET_USER_ROLE':
      return { ...state, userInfo: { ...state.userInfo, role: 'admin' } };
    // Handle other authentication-related actions here
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
