import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading component for indicating loading state
 */
const Loading = ({ 
  fullScreen = false,
  text = 'Loading...',
  size = 'md', // sm, md, lg
  color = 'primary', // primary, secondary, white
  overlay = true,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };
  
  // Color classes
  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    white: 'text-white',
  };
  
  // Text size classes
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  // Container classes based on fullScreen prop
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90'
    : 'flex flex-col items-center justify-center';
  
  return (
    <div className={`${containerClasses} ${props.className || ''}`}>
      <svg 
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        role="img"
        aria-label="Loading"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      
      {text && (
        <p className={`${textSizeClasses[size]} mt-3 font-medium ${colorClasses[color]}`}>
          {text}
        </p>
      )}
    </div>
  );
};

Loading.propTypes = {
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  overlay: PropTypes.bool,
  className: PropTypes.string,
};

export default Loading;