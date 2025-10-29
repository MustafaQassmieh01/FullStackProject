import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectRoute';
import PublicRoute from './components/PublicRoute';
import {useUser} from '../context/authProvider'

import HomePage from '../../features/courses/pages/HomePage';
import FrontPage from '../auth/pages/FrontPage';
import Unauthorized from '../utils/Unauthorized';
import AboutPage from '../../features/about/pages/AboutPage';
import Profile from '../../features/profile/pages/ProfilePage';
import NotFound from '../components/NotFound';
import AdminDashboard from '../../Admin/dashboard/pages/AdminDashboard';
import UserManagement from '../../Admin/Users/pages/AdminUsers';
import CourseManagement from '../../Admin/Courses/pages/AdminCourses';
import RegistrationManagement from '../../Admin/Registrations/pages/AdminRegistrations';
import AdminReports from '../../Admin/Reports/pages/AdminReports';

function Router() {
    const user = useUser();
    console.log('Router user:', user);
    return (
        <Routes>
            {/* Redirect '/' to '/frontpage' */}
            <Route path="/" element={<Navigate to="/frontpage" />} />

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

            {/* Admin routes */}
            <Route element={<ProtectedRoute requiresAdmin={true} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/courses" element={<CourseManagement />} />
                <Route path="/admin/registrations" element={<RegistrationManagement />} />
                <Route path="/admin/reports" element={<AdminReports />} />
            </Route>

            {/* Catch-all route for unregistered URLs */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
            
        </Routes>
    );
}
export default Router;