import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectRoute';
import {useUser} from '../context/authProvider'

// Importing all the components
import HomePage from '../components/user/homepage';
import FrontPage from '../components/shared/login/frontPage';
import Unauthorized from '../utils/unauthorized';
import Admin from '../components/admin/admin';
import AboutPage from '../components/shared/about/aboutPage';
import Profile from '../components/user/profile/profilePage';
// import aboutPage from '../shared/about/aboutPage';
// import profile from '../../user/profile/profile';

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
                {/* Add protected routes here */}
                {/* <Route path="/dashboard" element={<DashBoard admin={user.admin}/>} /> */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Routes here */ }

            <Route element={<ProtectedRoute requiresAdmin={true} />}>
                <Route path='/admin' element={<Admin />}/>
                {/* Add more admin routes here */}
            </Route>
            
        </Routes>
    );
}
export default Router;