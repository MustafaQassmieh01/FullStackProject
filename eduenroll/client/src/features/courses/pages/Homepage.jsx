import React from 'react';
import CourseDisplay from '../components/CourseCards';
import NavColumn from '../../../core/components/SideBar';

function HomePage() {
  return (
    <div className="home-page bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-4">
          <NavColumn role="user" className="w-full" />
        </div>
        <div className="py-4">
          <CourseDisplay className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;