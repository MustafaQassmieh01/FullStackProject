import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectRoute';
import {useUser} from '../context/authProvider'

import HomePage from '../../features/courses/pages/HomePage';
import FrontPage from '../../features/auth/pages/FrontPage';
import Unauthorized from '../utils/Unauthorized';
import AboutPage from '../../features/about/pages/AboutPage';
import Profile from '../../features/profile/pages/ProfilePage';

function Router() {
    const user = useUser();
    console.log('Router user:', user);
    return (
        <Routes>
            {/* public Routes*/}
            
            <Route path="/" element={<FrontPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Uncomment the following lines when the components are ready */}
            
            {/* Protected routes can be added here */}
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

        </Routes>
    );
}
export default Router;