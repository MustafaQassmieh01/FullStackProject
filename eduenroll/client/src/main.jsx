import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App.jsx'
import { AuthProvider } from './core/context/authProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
// Admin dashboard is moved to a dedicated component. Import it where needed (e.g. route /admin)
// import AdminDashboard from './Admin/dashboard/AdminDashboard.jsx';
// To preview the admin dashboard directly during development, you can temporarily render it here:
// import AdminDashboard from './Admin/dashboard/AdminDashboard.jsx';
// <AdminDashboard events={[{ date: new Date().toISOString(), title: 'Demo event', time: '10:00' }]} />


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
