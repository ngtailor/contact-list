import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  
    const isAuthenticated = localStorage.getItem('userData') !== null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
