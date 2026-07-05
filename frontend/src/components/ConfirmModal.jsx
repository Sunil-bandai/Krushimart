import { useEffect, useRef } from 'react';
import useUIStore from '../store/uiStore';

const ConfirmModal = () => {
  const { confirm, clearConfirm } = useUIStore();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!confirm.visible) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') clearConfirm();
    };
    document.addEventListener('keydown', handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [confirm.visible, clearConfirm]);

  if (!confirm.visible) return null;

  const handleConfirm = () => {
    if (typeof confirm.onConfirm === 'function') confirm.onConfirm();
    clearConfirm();
  };

  const handleCancel = () => {
    if (typeof confirm.onCancel === 'function') confirm.onCancel();
    clearConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40"
      onClick={clearConfirm}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-surface-container rounded-xl p-6 w-11/12 max-w-md outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-title" className="font-bold text-lg mb-2">{confirm.title || 'Confirm'}</h3>
        <p className="text-on-surface-variant mb-4">{confirm.message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={handleCancel} className="px-4 py-2 rounded-lg border">{confirm.cancelText || 'Cancel'}</button>
          <button onClick={handleConfirm} className="px-4 py-2 rounded-lg bg-primary text-on-primary">{confirm.confirmText || 'Confirm'}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
