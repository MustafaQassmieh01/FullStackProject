import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/authProvider';



const ProtectedRoute = ({requiresAdmin= false}) => {
    const {user } = useUser();
    console.log('ProtectedRoute user:', user);
  
    if (!tokenExists()) {
        console.log('User not authenticated, redirecting to login');
        return <Navigate to="/" replace />;
    }

    if (requiresAdmin && !user.isAdmin) {
        console.log('User is not an admin, redirecting to unauthorized page');
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}

function tokenExists(){
    const token = localStorage.getItem('token');
    return !!token;
}
export default ProtectedRoute;