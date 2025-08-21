// import { useState } from 'react'
import './App.css'
import Router  from './core/router/Router';
import Head from './core/components/PageHeader';
import Footer from './core/components/Footer';
// eduenroll\client\src\components\shared\logIn\frontPage.jsx

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head />
      <main className="flex-grow pt-14 pb-10"> {/* Adjusted padding */}
        <Router />
      </main>
      <Footer />
    </div>
  );
}

export default App;