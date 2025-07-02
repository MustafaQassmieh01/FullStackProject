import SignupForm from "./signIn-signUp/signup.jsx";
import LoginForm from "./signIn-signUp/signIn.jsx";
import { useState } from "react";



function FrontPage() {
    const [activeForm, setActiveForm] = useState('login'); // default to signup
    const handleSignupClick = () => {
        setActiveForm('signup');
    }
    const handleLoginClick = () => {
        setActiveForm('login');
    }
    return(
        <div className="front-page">
            <h1>Welcome to EduEnroll</h1>
            <p>Please choose an option below:</p>
            <div className="form-toggle">
                <button onClick={handleSignupClick} className={activeForm === 'signup' ? 'active' : ''}>Sign Up</button>
                <button onClick={handleLoginClick} className={activeForm === 'login' ? 'active' : ''}>Login</button>
            </div>
            <div className="form-container">
                {activeForm === 'signup' && <SignupForm />}
                {activeForm === 'login' && <LoginForm />}
            </div>
        </div>
    )
}
export default FrontPage;