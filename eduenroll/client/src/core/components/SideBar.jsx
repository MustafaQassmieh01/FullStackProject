import React from 'react';
import { useNavigate } from 'react-router-dom'

function NavColumn({ role }) {
  const navigate = useNavigate();

  const links = {
    admin:[
      { name: 'Dashboard', route: '/admin/dashboard' },
      { name: 'Manage Users', route: '/admin/users' },
      { name: 'Manage Courses', route: '/admin/courses' },
      { name: 'Manage Registrations', route: '/admin/registrations' },
      { name: 'Reports', route: '/admin/reports' },

    ],
    user:[
      { name: 'Homepage', route: '/home' },
      { name: 'About', route: '/about' },
      { name: 'Profile', route: '/profile' },
    ]
  };

  return (
    <div className="bg-white border-b border-teal-600 py-4 px-6 flex justify-center items-center w-full">
      <div className="flex gap-6">
        {links[role].map((link) => (
          <a
            key={link.name}
            onClick={() => navigate(link.route)}
            className="text-sm sm:text-base font-medium text-teal-600 hover:text-teal-800 cursor-pointer transition"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default NavColumn;