   import { useState } from 'react';
   import SignupForm from '../components/Signup';
   import LoginForm from '../components/SignIn';
   import './styles/FrontPage.css';

   function FrontPage() {
     const [activeForm, setActiveForm] = useState('login');

     const handleSignupClick = () => setActiveForm('signup');
     const handleLoginClick = () => setActiveForm('login');

     return (
       <div className="flex items-center justify-center bg-white px-4 h-[calc(80vh-8rem)]">
         <div className="w-full max-w-md bg-white rounded-xl p-6 sm:p-8 border border-teal-600 form-wrapper">
           <h1 className="text-2xl sm:text-3xl font-bold text-center text-teal-600 mb-2">
             Welcome to EduEnroll
           </h1>
           <p className="text-center text-black mb-6 text-sm sm:text-base">
             Please choose an option below:
           </p>

           <div className="flex justify-center gap-4 mb-6">
             <button
               onClick={handleSignupClick}
               className={`px-4 sm:px-5 py-2 rounded-full font-medium transition ${
                 activeForm === 'signup'
                   ? 'bg-teal-600 text-white shadow'
                   : 'bg-gray-100 text-black hover:bg-teal-100'
               }`}
             >
               Sign Up
             </button>
             <button
               onClick={handleLoginClick}
               className={`px-4 sm:px-5 py-2 rounded-full font-medium transition ${
                 activeForm === 'login'
                   ? 'bg-teal-600 text-white shadow'
                   : 'bg-gray-100 text-black hover:bg-teal-100'
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