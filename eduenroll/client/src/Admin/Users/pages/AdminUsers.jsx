import React, { useEffect, useState } from 'react';
import { Api } from '../../../api/userApi';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await Api.admin.users.getAll();
        const data = Array.isArray(res) ? res : (res && res.data) || [];
        setUsers(data);
      } catch (e) {
        console.error('Failed loading users', e);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleDelete = async (username) => {
    if (!confirm(`Delete user ${username}?`)) return;
    try {
      await Api.admin.users.delete(username);
      setUsers(u => u.filter(x => x.username !== username));
    } catch (e) {
      console.error('Failed to delete user', e);
      alert('Delete failed');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Users</h3>
      {loading ? <div>Loading...</div> : (
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-600">
              <tr>
                <th className="pb-2">Name</th>
                <th className="pb-2">Username</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Admin</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.username} className="border-t">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.username}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.admin ? 'Yes' : 'No'}</td>
                  <td className="py-2">
                    <button onClick={() => handleDelete(u.username)} className="text-sm text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
