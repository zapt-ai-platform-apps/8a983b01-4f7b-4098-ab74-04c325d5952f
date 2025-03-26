import { useState, useCallback } from 'react';

/**
 * Custom hook for managing toast notifications
 */
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  
  // Generate unique ID for each toast
  const generateId = useCallback(() => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }, []);
  
  // Add a new toast
  const addToast = useCallback((options) => {
    const id = options.id || generateId();
    
    setToasts(prevToasts => [
      ...prevToasts,
      {
        id,
        type: 'info',
        duration: 5000,
        showIcon: true,
        showCloseButton: true,
        ...options
      }
    ]);
    
    return id;
  }, [generateId]);
  
  // Add convenience methods for different toast types
  const toast = useCallback((message, options = {}) => {
    return addToast({ message, ...options });
  }, [addToast]);
  
  toast.info = useCallback((message, options = {}) => {
    return addToast({ message, type: 'info', ...options });
  }, [addToast]);
  
  toast.success = useCallback((message, options = {}) => {
    return addToast({ message, type: 'success', ...options });
  }, [addToast]);
  
  toast.warning = useCallback((message, options = {}) => {
    return addToast({ message, type: 'warning', ...options });
  }, [addToast]);
  
  toast.error = useCallback((message, options = {}) => {
    return addToast({ message, type: 'error', ...options });
  }, [addToast]);
  
  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);
  
  // Remove all toasts
  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);
  
  // Update a toast by ID
  const updateToast = useCallback((id, options) => {
    setToasts(prevToasts => 
      prevToasts.map(toast => 
        toast.id === id 
          ? { ...toast, ...options } 
          : toast
      )
    );
  }, []);
  
  return {
    toasts,
    toast,
    addToast,
    removeToast,
    removeAllToasts,
    updateToast
  };
};

export default useToast;