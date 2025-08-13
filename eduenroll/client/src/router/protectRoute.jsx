import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/authProvider';
import { getToken } from '../auth/tokenStore';


const ProtectedRoute = ({requiresAdmin= false}) => {
    const user  = useUser();
    const token = getToken();
    console.log('ProtectedRoute user:', user);
    // If no user or token, redirect to login
    if (!user || !token) {
        console.log('User not authenticated, redirecting to login');
        return <Navigate to="/" replace />;

    }

    // If requiresAdmin is true and user is not an admin, redirect to home
    if (requiresAdmin && !user.isAdmin) {
        console.log('User is not an admin, redirecting to unauthorized page');
        return <Navigate to="/unauthorised" replace />;
    }

    // If user is authenticated and authorized, render the child components
    return <Outlet />;
}
export default ProtectedRoute;