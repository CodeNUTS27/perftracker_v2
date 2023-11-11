import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';

function PrivateRoute({ element, allowedRoles }) {
  const { state } = useAuth();
  const user = state.userInfo;

  if (!user.isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User's role doesn't match the allowed roles
    return <Navigate to="/unauthorized" />;
  }

  return <Route element={element} />;
}

export default PrivateRoute;
