import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, expectedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // atau spinner
  if (!user) return <Navigate to="/" replace />;
  if (expectedRole && user.role !== expectedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;