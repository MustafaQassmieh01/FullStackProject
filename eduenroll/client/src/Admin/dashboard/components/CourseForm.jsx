import React, { useState, useEffect } from 'react';

const CourseForm = ({ open, initial = {}, onCancel, onSave, saving = false }) => {
  const [courseCode, setCourseCode] = useState(initial.course_code || '');
  const [title, setTitle] = useState(initial.title || '');
  const [capacity, setCapacity] = useState(initial.capacity ?? '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCourseCode(initial.course_code || '');
    setTitle(initial.title || '');
    setCapacity(initial.capacity ?? '');
    setErrors({});
  }, [initial, open]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!courseCode) e.course_code = 'Course code required';
    if (!title) e.title = 'Title required';
    if (capacity === '' || capacity === null) e.capacity = 'Capacity required';
    else if (Number.isNaN(Number(capacity)) || Number(capacity) < 0) e.capacity = 'Capacity must be a non-negative number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onSave({ course_code: courseCode, title, capacity: Number(capacity) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-5">
        <div className="text-lg font-semibold">{initial.course_code ? 'Edit Course' : 'Create Course'}</div>
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-sm block">Course Code</label>
            <input value={courseCode} onChange={e => setCourseCode(e.target.value)} className="w-full border rounded px-2 py-1" disabled={!!initial.course_code} />
            {errors.course_code && <div className="text-xs text-red-600">{errors.course_code}</div>}
          </div>
          <div>
            <label className="text-sm block">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-2 py-1" />
            {errors.title && <div className="text-xs text-red-600">{errors.title}</div>}
          </div>
          <div>
            <label className="text-sm block">Capacity</label>
            <input value={capacity} onChange={e => setCapacity(e.target.value)} className="w-full border rounded px-2 py-1" />
            {errors.capacity && <div className="text-xs text-red-600">{errors.capacity}</div>}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 border rounded" disabled={saving}>Cancel</button>
          <button onClick={submit} className="px-3 py-1 bg-blue-600 text-white rounded" disabled={saving}>{saving ? 'Saving...' : (initial.course_code ? 'Save' : 'Create')}</button>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
