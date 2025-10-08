import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App.jsx'
import { AuthProvider } from './core/context/authProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import CourseDisplay from './Admin/dashboard/components/CourseDisplay.jsx';
import UserDisplay from './Admin/dashboard/components/UserDisplay.jsx';
import RegistrationDisplay from './Admin/dashboard/components/RegistrationDisplay.jsx';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <App /> */}
        <CourseDisplay/>
        <UserDisplay />
        <RegistrationDisplay />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
