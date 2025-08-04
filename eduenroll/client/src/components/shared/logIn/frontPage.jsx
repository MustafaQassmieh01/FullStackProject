import { useState } from 'react';
import SignupForm from './signup.jsx';
import LoginForm from './signIn.jsx';

function FrontPage() {
  const [activeForm, setActiveForm] = useState('login');

  const handleSignupClick = () => setActiveForm('signup');
  const handleLoginClick = () => setActiveForm('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-200 via-amber-300 to-yellow-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-amber-600 mb-2">Welcome to EduEnroll</h1>
        <p className="text-center text-gray-600 mb-6">Please choose an option below:</p>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleSignupClick}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeForm === 'signup'
                ? 'bg-amber-500 text-white shadow'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeForm === 'login'
                ? 'bg-amber-500 text-white shadow'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Login
          </button>
        </div>

        <div className="form-container">
          {activeForm === 'signup' ? <SignupForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
