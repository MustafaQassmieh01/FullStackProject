import React, { useEffect, useState } from 'react';
import { Api } from '../../../api/userApi';
import ConfirmModal from '../../dashboard/components/ConfirmModal';
import Spinner from '../../dashboard/components/Spinner';

const AdminRegistrations = () => {
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetAction, setTargetAction] = useState(null);
  const [targetId, setTargetId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await Api.admin.registrations.getAll();
        setRegs(data || []);
      } catch (e) {
        console.error('Failed loading registrations', e);
        setMessage('Failed to load registrations');
      }
      setLoading(false);
    };
    load();
  }, []);

  const askChange = (id, action) => {
    setTargetId(id);
    setTargetAction(action);
    setModalOpen(true);
  };

  const changeStatus = async () => {
    if (!targetId || !targetAction) return;
    setProcessingId(targetId);
  try {
  await Api.admin.registrations.changeStatus(targetId, targetAction);
  setRegs(r => r.map(x => x.id === targetId ? { ...x, status: targetAction } : x));
      setMessage('Status updated');
    } catch (e) {
      console.error('Failed to change status', e);
      setMessage('Status change failed');
    }
    setProcessingId(null);
    setModalOpen(false);
    setTargetAction(null);
    setTargetId(null);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Registrations</h3>
      {message && <div className="mb-3 text-sm text-gray-700">{message}</div>}
      {loading ? (
        <div className="space-y-2">
          <div className="h-8 bg-gray-100 rounded" />
          <div className="h-8 bg-gray-100 rounded w-4/5" />
        </div>
      ) : (
        <div className="space-y-2">
          {regs.map(r => (
            <div key={r.id} className="p-3 border rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{r.student_name || r.userId || r.user_id}</div>
                <div className="text-xs text-gray-500">Course: {r.course_code || r.course?.course_code} • Status: {r.status}</div>
              </div>
              <div className="flex items-center gap-2">
                {r.status !== 'approved' && <button onClick={() => askChange(r.id, 'approved')} className="text-sm text-green-600 hover:underline" disabled={processingId === r.id}>{processingId === r.id ? <Spinner /> : 'Approve'}</button>}
                {r.status !== 'rejected' && <button onClick={() => askChange(r.id, 'rejected')} className="text-sm text-red-600 hover:underline" disabled={processingId === r.id}>{processingId === r.id ? <Spinner /> : 'Reject'}</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={modalOpen}
        title={targetAction === 'approved' ? 'Approve registration' : 'Reject registration'}
        message={`Are you sure you want to ${targetAction} this registration?`}
        onCancel={() => { if (!processingId) { setModalOpen(false); setTargetAction(null); setTargetId(null); } }}
        onConfirm={changeStatus}
        busy={Boolean(processingId)}
        confirmText={targetAction === 'approved' ? 'Approve' : 'Reject'}
      />
    </div>
  );
};

export default AdminRegistrations;
