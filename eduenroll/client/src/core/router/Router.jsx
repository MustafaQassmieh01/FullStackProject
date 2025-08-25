import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectRoute';
import PublicRoute from './components/PublicRoute';
import {useUser} from '../context/authProvider'

import HomePage from '../../features/courses/pages/HomePage';
import FrontPage from '../../features/auth/pages/FrontPage';
import Unauthorized from '../utils/Unauthorized';
import AboutPage from '../../features/about/pages/AboutPage';
import Profile from '../../features/profile/pages/ProfilePage';
import NotFound from '../components/NotFound';

function Router() {
    const user = useUser();
    console.log('Router user:', user);
    return (
        <Routes>
            
            {/* Public routes */}
            <Route element={<PublicRoute />}>
                <Route path="/frontpage" element={<FrontPage />} />
            </Route>
            
            {/* Protected routes can be added here */}
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Catch-all route for unregistered URLs */}
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    );
}
export default Router;