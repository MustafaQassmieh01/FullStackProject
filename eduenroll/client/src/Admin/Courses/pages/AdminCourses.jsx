import React, { useEffect, useState } from 'react';
import { Api } from '../../../api/userApi';
import ConfirmModal from '../../dashboard/components/ConfirmModal';
import Spinner from '../../dashboard/components/Spinner';
import CourseForm from '../../dashboard/components/CourseForm';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await Api.User.courses.getAll();
        setCourses(data || []);
      } catch (e) {
        console.error('Failed loading courses', e);
        setMessage('Failed to load courses');
      }
      setLoading(false);
    };
    load();
  }, []);

  const askDelete = (code) => {
    setTarget(code);
    setModalOpen(true);
  };

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEditCapacity = (course) => { setEditing(course); setFormOpen(true); };

  const handleDelete = async () => {
    if (!target) return;
    setProcessing(true);
    try {
      await Api.admin.courses.delete(target);
      setCourses(c => c.filter(x => x.course_code !== target));
      setMessage('Course deleted');
    } catch (e) {
      console.error('Failed to delete course', e);
      setMessage('Delete failed');
    }
    setProcessing(false);
    setModalOpen(false);
    setTarget(null);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Courses</h3>
      {message && <div className="mb-3 text-sm text-gray-700">{message}</div>}
      {loading ? (
        <div className="space-y-2">
          <div className="h-8 bg-gray-100 rounded" />
          <div className="h-8 bg-gray-100 rounded w-4/5" />
          <div className="h-8 bg-gray-100 rounded w-3/5" />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-end mb-2">
            <button onClick={openCreate} className="px-3 py-1 bg-green-600 text-white rounded">+ Add Course</button>
          </div>
          {courses.map(c => (
            <div key={c.course_code} className="p-3 border rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{c.title || c.course_code}</div>
                <div className="text-xs text-gray-500">Code: {c.course_code} • Capacity: {c.capacity ?? '-'}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEditCapacity(c)} className="text-sm text-blue-600 hover:underline">Edit</button>
                <button onClick={() => askDelete(c.course_code)} className="text-sm text-red-600 hover:underline" disabled={processing}>{processing && target === c.course_code ? <Spinner /> : 'Delete'}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={modalOpen}
        title="Delete course"
        message={`Are you sure you want to delete course ${target}? This action cannot be undone.`}
        onCancel={() => { if (!processing) { setModalOpen(false); setTarget(null); } }}
        onConfirm={handleDelete}
        busy={processing}
        confirmText="Delete"
      />

      <CourseForm
        open={formOpen}
        initial={editing || {}}
        onCancel={() => setFormOpen(false)}
        saving={processing}
        onSave={async (payload) => {
          setProcessing(true);
          try {
            if (editing && editing.course_code) {
              // update capacity only
              await Api.admin.courses.updateCapacity(editing.course_code, { capacity: payload.capacity });
              setCourses(c => c.map(x => x.course_code === editing.course_code ? { ...x, capacity: payload.capacity } : x));
              setMessage('Capacity updated');
            } else {
              // create
              const newCourse = await Api.admin.courses.create(payload);
              setCourses(c => [newCourse, ...c]);
              setMessage('Course created');
            }
          } catch (e) {
            console.error('Save failed', e);
            setMessage('Save failed');
          }
          setProcessing(false);
          setFormOpen(false);
          setEditing(null);
        }}
      />
    </div>
  );
};

export default AdminCourses;
