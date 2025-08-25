import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/authProvider';

const PublicRoute = () => {
    const { user } = useUser();

    if (tokenExists() && user) {
        console.log('User already authenticated, redirecting to home');
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

function tokenExists() {
    const token = localStorage.getItem('token');
    return !!token;
}

export default PublicRoute;