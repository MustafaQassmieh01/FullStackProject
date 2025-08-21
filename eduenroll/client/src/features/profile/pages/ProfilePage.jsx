import {useUser} from '../../../core/context/authProvider';
import React, { useState, useEffect } from 'react';
import Registrations from '../components/Registrations';
import Head  from '../../../core/components/PageHeader';
import NavColumn  from '../../../core/components/SideBar';
import Footer  from '../../../core/components/Footer';

function Profile() {
  return (
    <div className="profile-page bg-gray-100 min-h-screen">
      <h1>profile here</h1>
    </div>
  );
}
function ProfilePage() {
  const { user } = useUser();
  if (!user) {
    return <div className="text-center text-gray-500">user not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={user._id}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">role: {user.admin}</h2>
          <p className="text-gray-500">{user.username}</p>
        </div>

        {/* Bio */}
        <div className="mt-4 text-center text-gray-600">
          <Clock />
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

function Clock(){
  const [time, setTime] = useState(new Date());
  useEffect(()=>{
    const interval = setInterval(()=>{
      setTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Head/>
      <NavColumn role='user'/>
      <div className=" mb-4">
        <div className="text-center text-gray-500">
          {time.toLocaleTimeString()}
        </div>
        <Registrations />
      </div>
      <Footer/>
    </>
  );
}

export default ProfilePage;