import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/authProvider.jsx';

/**
 * SideBar (renamed NavColumn in codebase) — now a top horizontal nav bar styled to match the new design.
 * Accepts optional `role` prop (defaults to 'user'). Keeps the same route map as before.
 */
function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const role = user?.role === 'admin' ? 'admin' : 'user';

  const links = {
    admin: [
      { name: 'Dashboard', route: '/admin/dashboard' },
      { name: 'Manage Users', route: '/admin/users' },
      { name: 'Manage Courses', route: '/admin/courses' },
      { name: 'Manage Registrations', route: '/admin/registrations' },
      { name: 'Reports', route: '/admin/reports' }
    ],
    user: [
      { name: 'Homepage', route: '/home' },
      { name: 'About', route: '/about' },
      { name: 'Profile', route: '/profile' }
    ]
  };

  const navLinks = links[role] || links.user;

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold text-gray-800">EduEnroll</div>
        </div>

        <nav className="flex items-center gap-2">
          {navLinks.map(link => {
            const active = location.pathname === link.route;
            return (
              <button
                key={link.name}
                onClick={() => navigate(link.route)}
                className={`text-sm px-3 py-1 rounded transition ${active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default Nav;