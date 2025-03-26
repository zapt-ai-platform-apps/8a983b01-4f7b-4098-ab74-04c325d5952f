import React from 'react';
import PropTypes from 'prop-types';

/**
 * Alert component for displaying messages
 */
const Alert = ({
  children,
  severity = 'info', // info, success, warning, error
  variant = 'filled', // filled, outlined, standard
  icon = null,
  title = null,
  onClose = null,
  action = null,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'rounded-lg p-4 flex';
  
  // Severity classes for each variant
  const severityClasses = {
    filled: {
      info: 'bg-blue-500 text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-amber-500 text-white',
      error: 'bg-red-500 text-white'
    },
    outlined: {
      info: 'bg-blue-50 border border-blue-300 text-blue-800',
      success: 'bg-green-50 border border-green-300 text-green-800',
      warning: 'bg-amber-50 border border-amber-300 text-amber-800',
      error: 'bg-red-50 border border-red-300 text-red-800'
    },
    standard: {
      info: 'bg-blue-50 text-blue-800',
      success: 'bg-green-50 text-green-800',
      warning: 'bg-amber-50 text-amber-800',
      error: 'bg-red-50 text-red-800'
    }
  };
  
  // Default icons
  const defaultIcons = {
    info: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
          clipRule="evenodd" 
        />
      </svg>
    ),
    success: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
          clipRule="evenodd" 
        />
      </svg>
    ),
    warning: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
          clipRule="evenodd" 
        />
      </svg>
    ),
    error: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
          clipRule="evenodd" 
        />
      </svg>
    )
  };
  
  // Close button for filled variant
  const CloseButton = () => (
    <button 
      type="button" 
      aria-label="Close"
      onClick={onClose}
      className={`inline-flex rounded-md p-1 ml-auto focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        variant === 'filled' 
          ? 'text-white focus:ring-white' 
          : 'focus:ring-blue-500'
      }`}
    >
      <svg 
        className="h-4 w-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M6 18L18 6M6 6l12 12" 
        />
      </svg>
    </button>
  );
  
  // Combine all classes
  const alertClasses = `
    ${baseClasses}
    ${severityClasses[variant][severity]}
    ${className}
  `;
  
  return (
    <div 
      role="alert"
      className={alertClasses}
      {...props}
    >
      {/* Icon */}
      {(icon || defaultIcons[severity]) && (
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {icon || defaultIcons[severity]}
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1">
        {title && (
          <h3 className="text-sm font-medium mb-1">
            {title}
          </h3>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>
      
      {/* Action */}
      {action && (
        <div className="ml-auto">
          {action}
        </div>
      )}
      
      {/* Close button */}
      {onClose && !action && (
        <CloseButton />
      )}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  severity: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  icon: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
  action: PropTypes.node,
  className: PropTypes.string,
};

export default Alert;