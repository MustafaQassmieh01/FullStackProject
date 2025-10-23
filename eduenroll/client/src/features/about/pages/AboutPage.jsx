import React from 'react';
import Nav from '../../../core/components/Nav';

function AboutPage() {
  return (
    <div className="about-page bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-4">
          <Nav role="user" className="w-full" />
        </div>
        <div className="py-4">
          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-600 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-teal-600 mb-4 text-center">About EduEnroll</h1>
            <div className="space-y-4 text-gray-800 text-base">
              <p>EduEnroll is a comprehensive platform designed to streamline the enrollment process for educational institutions.</p>
              <p>Our mission is to simplify the management of student enrollments, making it easier for both administrators and students.</p>
              <p>We offer a range of features including course management, student profiles, and administrative tools to enhance the educational experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;