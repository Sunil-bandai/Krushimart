import { create } from 'zustand';

const useUIStore = create((set) => ({
  isLoading: false,
  notification: {
    message: '',
    type: '', // 'success' | 'error' | 'info'
  },
  confirm: {
    visible: false,
    title: '',
    message: '',
    confirmText: 'OK',
    cancelText: 'Cancel',
    onConfirm: null,
    onCancel: null,
  },

  setLoading: (bool) => set({ isLoading: bool }),

  showNotification: (message, type = 'info') =>
    set({ notification: { message, type } }),

  // Confirmation modal helpers
  showConfirm: (opts) => set((state) => ({
    confirm: {
      visible: true,
      title: opts.title || state.confirm.title || '',
      message: opts.message || state.confirm.message || '',
      confirmText: opts.confirmText || 'OK',
      cancelText: opts.cancelText || 'Cancel',
      onConfirm: opts.onConfirm || null,
      onCancel: opts.onCancel || null,
    }
  })),

  clearConfirm: () => set({ confirm: { visible: false, title: '', message: '', confirmText: 'OK', cancelText: 'Cancel', onConfirm: null, onCancel: null } }),

  clearNotification: () =>
    set({ notification: { message: '', type: '' } }),
}));

export default useUIStore;
