import React, { useState } from 'react';

const ChangePasswordForm = ({ handleChangePass }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleChangePass(oldPassword, newPassword);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-teal-600 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-teal-600 mb-4">Change Password</h2>
            <div className="mb-4">
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                >
                    Change Password
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;