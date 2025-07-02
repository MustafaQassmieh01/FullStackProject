import { createRoot } from 'react-dom/client'
import React from 'react';
import './index.css'
import FrontPage from './components/shared/login-signup/frontPage'
import App from './App.jsx'
import { AuthProvider } from './context/authProvider.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
