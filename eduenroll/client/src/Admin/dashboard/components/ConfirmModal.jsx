import React from 'react';

const ConfirmModal = ({ open, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', busy = false }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-sm text-gray-600 mt-2">{message}</div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 rounded border" disabled={busy}>{cancelText}</button>
          <button onClick={onConfirm} className="px-3 py-1 rounded bg-red-600 text-white" disabled={busy}>{busy ? 'Working...' : confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
