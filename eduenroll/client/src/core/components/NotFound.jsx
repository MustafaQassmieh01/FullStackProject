import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found text-center mt-10">
            <h1 className="text-4xl font-bold text-red-600">404</h1>
            <p className="text-lg text-gray-700 mt-4">Page Not Found</p>
            <Link to="/home" className="mt-6 inline-block px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700">
                Go Back to Dashboard
            </Link>
        </div>
    );
}

export default NotFound;