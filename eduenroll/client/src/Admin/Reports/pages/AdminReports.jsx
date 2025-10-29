import React, { useEffect, useState } from 'react';
import { Api } from '../../../api/userApi';

function toCsv(rows) {
  if (!rows || !rows.length) return '';
  const keys = Object.keys(rows[0]);
  const lines = [keys.join(',')];
  for (const r of rows) {
    lines.push(keys.map(k => JSON.stringify(r[k] ?? '')).join(','));
  }
  return lines.join('\n');
}

const AdminReports = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const u = await Api.admin.users.getAll();
        setUsers(Array.isArray(u) ? u : (u && u.data) || []);
      } catch(e){ console.warn('users failed', e); }
      try {
        const c = await Api.User.courses.getAll();
        setCourses(Array.isArray(c) ? c : (c && c.data) || []);
      } catch(e){ console.warn('courses failed', e); }
      try {
        const r = await Api.admin.registrations.getAll();
        setRegs(Array.isArray(r) ? r : (r && r.data) || []);
      } catch(e){ console.warn('regs failed', e); }
    };
    load();
  }, []);

  const download = (rows, name) => {
    const csv = toCsv(rows);
    if (!csv) { alert('No data'); return; }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${name}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Reports</h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <button onClick={() => download(users, 'users')} className="btn">Download Users CSV</button>
          <button onClick={() => download(courses, 'courses')} className="btn">Download Courses CSV</button>
          <button onClick={() => download(regs, 'registrations')} className="btn">Download Registrations CSV</button>
        </div>
        <div className="text-sm text-gray-600">Users: {users.length} • Courses: {courses.length} • Registrations: {regs.length}</div>
      </div>
    </div>
  );
};

export default AdminReports;
