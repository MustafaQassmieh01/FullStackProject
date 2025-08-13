import {useUser} from '../../../context/authProvider';
import React, { useState, useEffect } from 'react';
import Registrations from './registrations';
import Head  from '../../../components/shared/components/pageHeader';
import NavColumn  from '../../../components/shared/components/sideBar';
import Footer  from '../../../components/shared/components/footer';

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
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.title}</p>
        </div>

        {/* Bio */}
        <p className="mt-4 text-center text-gray-600"><Clock /></p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 text-center">
          <div>
            <p className="text-lg font-bold">{user.name}</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div>
            <p className="text-lg font-bold">{}</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
          <div>
            <p className="text-lg font-bold">{user.stats.posts}</p>
            <p className="text-gray-500 text-sm">Posts</p>
          </div>
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
  })
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