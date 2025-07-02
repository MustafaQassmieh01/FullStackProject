import React from 'react';

function Admin() {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage users, courses, and other administrative tasks.</p>
            <div className="admin-actions">
                <button onClick={() => window.location.href = '/manage-users'}>Manage Users</button>
                <button onClick={() => window.location.href = '/manage-courses'}>Manage Courses</button>
                <button onClick={() => window.location.href = '/view-reports'}>View Reports</button>
            </div>
        </div>
    );
}

export default Admin;