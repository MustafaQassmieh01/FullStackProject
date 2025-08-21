import { useUser } from '../../../core/context/authProvider';
import React, { useState, useEffect } from 'react';
import Registrations from '../components/Registrations';
import NavColumn from '../../../core/components/SideBar';

function ProfilePage() {
  const { user } = useUser();
  if (!user) {
    return <div className="text-center text-gray-500 text-sm py-8">User not found</div>;
  }

  return (
    <div className="profile-page bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-4">
          <NavColumn role="user" className="w-full" />
        </div>
        <div className="py-4">
          <div className="bg-white p-6 rounded-lg shadow-md border border-teal-600 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/96"
                alt={user.name || 'User'}
                className="w-24 h-24 rounded-full border-4 border-teal-500"
              />
              <h2 className="mt-4 text-2xl font-bold text-teal-600">
                {user.name || 'User'} {user.admin ? '(Admin)' : '(User)'}
              </h2>
              <p className="text-gray-500 text-sm">{user.username || 'N/A'}</p>
            </div>

            <div className="mt-4 text-center text-gray-600 text-sm">
              <Clock />
            </div>
            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none transition">
                Edit Profile
              </button>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">My Registrations</h3>
              <Registrations />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-gray-600 text-sm">
      Current Time: {time.toLocaleTimeString()}
    </div>
  );
}

export default ProfilePage;