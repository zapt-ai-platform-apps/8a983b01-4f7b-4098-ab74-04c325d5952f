import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

// Create context
const ToastContext = createContext(null);

/**
 * Toast provider component
 */
export const ToastProvider = ({ children, position = 'bottom-right' }) => {
  const { toasts, toast, removeToast, removeAllToasts, updateToast } = useToast();
  
  const toastContextValue = {
    toast,
    removeToast,
    removeAllToasts,
    updateToast,
  };
  
  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        position={position} 
        removeToast={removeToast} 
      />
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf([
    'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
  ]),
};

/**
 * Custom hook to use the toast context
 */
export const useToastContext = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  
  return context;
};