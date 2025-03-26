import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

/**
 * Toast notification component
 */
const Toast = ({
  message,
  type = 'info', // info, success, warning, error
  duration = 5000, // ms
  position = 'bottom-right', // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
  onClose,
  action = null,
  showIcon = true,
  showCloseButton = true,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-dismiss after duration
  useEffect(() => {
    if (duration === 0) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // Wait for exit animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  // Base classes
  const baseClasses = 'max-w-sm rounded-lg shadow-lg p-4 flex items-start transition-all duration-300 transform';
  
  // Type classes (color variations)
  const typeClasses = {
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-red-600 text-white',
  };
  
  // Position classes
  const positionClasses = {
    'top-right': 'right-4 top-4',
    'top-left': 'left-4 top-4',
    'bottom-right': 'right-4 bottom-4',
    'bottom-left': 'left-4 bottom-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };
  
  // Visibility classes
  const visibilityClasses = isVisible 
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-8';
  
  // Icons
  const icons = {
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  };
  
  // Close button
  const CloseButton = () => (
    <button
      aria-label="Close"
      onClick={() => {
        setIsVisible(false);
        setTimeout(() => onClose(), 300); // Wait for exit animation
      }}
      className="ml-auto -mr-1 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white p-1 rounded-full"
    >
      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
  
  // Combine all classes
  const toastClasses = `
    ${baseClasses}
    ${typeClasses[type]}
    ${positionClasses[position]}
    ${visibilityClasses}
    fixed z-50
    ${className}
  `;
  
  const content = (
    <div
      role="alert"
      className={toastClasses}
      {...props}
    >
      {showIcon && (
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
      )}
      
      <div className="mr-3 flex-1">
        {message}
      </div>
      
      {action && (
        <div className="ml-auto mr-3">
          {action}
        </div>
      )}
      
      {showCloseButton && !action && <CloseButton />}
    </div>
  );
  
  return createPortal(content, document.body);
};

Toast.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  duration: PropTypes.number,
  position: PropTypes.oneOf([
    'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
  ]),
  onClose: PropTypes.func.isRequired,
  action: PropTypes.node,
  showIcon: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
};

// Toast Container Component to manage multiple toasts
const ToastContainer = ({ toasts, position = 'bottom-right', removeToast }) => {
  // Position class for the container
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };
  
  // Container class
  const containerClasses = `fixed z-50 flex flex-col gap-2 ${positionClasses[position]}`;
  
  // If no toasts, don't render the container
  if (toasts.length === 0) return null;
  
  return createPortal(
    <div className={containerClasses}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={position}
          onClose={() => removeToast(toast.id)}
          action={toast.action}
          showIcon={toast.showIcon !== false}
          showCloseButton={toast.showCloseButton !== false}
        />
      ))}
    </div>,
    document.body
  );
};

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
      duration: PropTypes.number,
      action: PropTypes.node,
      showIcon: PropTypes.bool,
      showCloseButton: PropTypes.bool,
    })
  ).isRequired,
  position: PropTypes.oneOf([
    'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
  ]),
  removeToast: PropTypes.func.isRequired,
};

export { Toast, ToastContainer };