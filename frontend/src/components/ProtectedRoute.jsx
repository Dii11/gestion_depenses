import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ element: Component, allowedRoles, ...rest }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Rediriger vers la page d'accueil si le rôle n'est pas autorisé
  }

  return <Component />;
}

export default ProtectedRoute;