import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center text-center">
        <p className="text-base sm:text-lg text-gray-300">
          © 2025 EduEnroll. All rights reserved.
        </p>
        <div className="mt-4 flex space-x-6">
          <a
            href="#"
            className="text-teal-400 hover:text-teal-300 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-teal-400 hover:text-teal-300 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-teal-400 hover:text-teal-300 transition-colors duration-200"
          >
            Contact Us
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;