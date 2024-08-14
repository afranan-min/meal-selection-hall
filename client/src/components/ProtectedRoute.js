import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role; // Assuming role is included in the token payload
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds

    if (Date.now() >= expirationTime) {
      // Token is expired
      return <Navigate to="/" />;
    }

    if (userRole !== requiredRole) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error(error);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
