import React from 'react';
import './styles/Header.css';

function Head() {
  return (
    <header className="page-header py-6 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight animated-text-gradient">
          EduEnroll
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
          Welcome to the EduEnroll application, your gateway to managing educational enrollments efficiently.
        </p>
      </div>
    </header>
  );
}

export default Head;