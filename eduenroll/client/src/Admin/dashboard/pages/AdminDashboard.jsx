import React from 'react';
import UserDisplay from '../components/UserDisplay.jsx';
import CourseDisplay from '../components/CourseDisplay.jsx';
import RegistrationDisplay from '../components/RegistrationDisplay.jsx';
import Calendar from '../components/Calendar.jsx';
import Nav from '../../../core/components/Nav.jsx';
import News from '../components/News.jsx';

const AdminDashboard = ({ events }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Statistics row (full width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UserDisplay />
          <CourseDisplay />
        </div>

        {/* Registrations below (full width) */}
        <div className="mt-6">
          <RegistrationDisplay />
        </div>

        {/* Main content: calendar left, news right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1">
            <Calendar events={events} />
          </div>
          <div className="col-span-2">
            <News />
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AdminDashboard;
