import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectRoute';

// Importing all the components
import HomePage from '../shared/homePage';
import FrontPage from '../shared/frontPage';
import Unauthorized from '../utils/unauthorized';
import Admin from '../admin/admin';
// import aboutPage from '../shared/about/aboutPage';
// import profile from '../../user/profile/profile';

function Router() {
    return (
        <Routes>
            {/* public Routes*/}
            
            <Route path="/frontpage" element={<FrontPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* Uncomment the following lines when the components are ready */}
            
            {/* Protected routes can be added here */}
            <Route element={<ProtectedRoute />}>
                {/* Add protected routes here */}
                <Route path="/" element={<HomePage />} />
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