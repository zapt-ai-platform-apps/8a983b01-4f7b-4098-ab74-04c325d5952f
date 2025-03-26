import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component with various variants and states
 */
const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, text
  size = 'md', // sm, md, lg
  color = 'primary', // primary, secondary, success, warning, error
  isFullWidth = false,
  isDisabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  className = '',
  startIcon = null,
  endIcon = null,
  ...props
}) => {
  // Base classes for all buttons
  const baseClasses = 'flex items-center justify-center gap-2 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  // Variant and color classes
  const variantClasses = {
    primary: {
      primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
      secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
      warning: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400',
      error: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    },
    secondary: {
      primary: 'bg-primary-100 hover:bg-primary-200 text-primary-800 focus:ring-primary-400',
      secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-800 focus:ring-secondary-400',
      success: 'bg-green-100 hover:bg-green-200 text-green-800 focus:ring-green-400',
      warning: 'bg-amber-100 hover:bg-amber-200 text-amber-800 focus:ring-amber-400',
      error: 'bg-red-100 hover:bg-red-200 text-red-800 focus:ring-red-400',
    },
    outline: {
      primary: 'border border-primary-600 text-primary-700 hover:text-white hover:bg-primary-600 focus:ring-primary-500',
      secondary: 'border border-secondary-600 text-secondary-700 hover:text-white hover:bg-secondary-600 focus:ring-secondary-500',
      success: 'border border-green-600 text-green-700 hover:text-white hover:bg-green-600 focus:ring-green-500',
      warning: 'border border-amber-500 text-amber-600 hover:text-white hover:bg-amber-500 focus:ring-amber-400',
      error: 'border border-red-600 text-red-700 hover:text-white hover:bg-red-600 focus:ring-red-500',
    },
    text: {
      primary: 'text-primary-700 hover:text-primary-800 hover:bg-primary-50 focus:ring-primary-500',
      secondary: 'text-secondary-700 hover:text-secondary-800 hover:bg-secondary-50 focus:ring-secondary-500',
      success: 'text-green-700 hover:text-green-800 hover:bg-green-50 focus:ring-green-500',
      warning: 'text-amber-600 hover:text-amber-700 hover:bg-amber-50 focus:ring-amber-400',
      error: 'text-red-700 hover:text-red-800 hover:bg-red-50 focus:ring-red-500',
    }
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-60 cursor-not-allowed pointer-events-none';
  
  // Full width class
  const fullWidthClass = isFullWidth ? 'w-full' : '';
  
  // Loading state
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant][color]}
    ${isDisabled || isLoading ? disabledClasses : ''}
    ${fullWidthClass}
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && startIcon && (
        <span className="button-start-icon">{startIcon}</span>
      )}
      {children}
      {!isLoading && endIcon && (
        <span className="button-end-icon">{endIcon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error']),
  isFullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

export default Button;