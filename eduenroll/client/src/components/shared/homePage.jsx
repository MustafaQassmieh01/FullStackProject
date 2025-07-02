import React from 'react';

function HomePage() {
    return (
        <div className="home-page">
            <h1>Welcome to EduEnroll</h1>
            <p>Your one-stop solution for educational enrollment.</p>
            <p>Please choose an option below:</p>
            <div className="form-toggle">
                <button onClick={() => window.location.href = '/frontpage'}>Get Started</button>
            </div>
        </div>
    );
}
export default HomePage;