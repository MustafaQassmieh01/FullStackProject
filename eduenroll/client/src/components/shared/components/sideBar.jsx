import React from 'react';
import {useState} from 'react'
import {
  IdentificationIcon,
  InformationCircleIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

function NavColumn({role}){
    const [visible, setVisible] = useState(false);
    const onClick = () =>{setVisible(!visible)}

    const links = {
        admin: [
            {
            name: 'Dashboard',
            icon: <HomeIcon className="w-6 h-6" />,
            route: '/admin/dashboard',
            },
            {
            name: 'Users',
            icon: <UserGroupIcon className="w-6 h-6" />,
            route: '/admin/users',
            },
        ],
        user: [
            {
            name: 'Profile',
            icon: <IdentificationIcon className="w-6 h-6" />,
            route: '/user/profile',
            },
            {
            name: 'Settings',
            icon: <Cog6ToothIcon className="w-6 h-6" />,
            route: '/user/settings',
            },
        ],
    };

    const navLinks = links[role] || [];
    return (
        <>
            <div
            onClick={onClick}
            className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition'
            >
                <Bars4Icon
                className="w-6 h-6 text-gray-800"
                />
            </div>
            {/* Optional: show children or menu if visible */}
            {visible && (
            <div className="mt-4 space-y-2">
               {
                navLinks.map(link => (
                <>
                    <span key={link.name}
                        className="flex items-center space-x-2">
                        {link.icon}
                    </span>
                    <a key={link.name} href={link.route}>{link.name}</a>
                </> 
                ))}
            </div>
            )}
        </>
    )

}