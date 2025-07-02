import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/authProvider';
import { getToken } from '../../auth/tokenStore';


const ProtectedRoute = ({requiresAdmin= false}) => {
    const { user } = useUser();
    const token = getToken();
    // If no user or token, redirect to login
    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    // If requiresAdmin is true and user is not an admin, redirect to home
    if (requiresAdmin && !user.isAdmin) {
        return <Navigate to="/unauthorised" replace />;
    }

    // If user is authenticated and authorized, render the child components
    return <Outlet />;
}
export default ProtectedRoute;