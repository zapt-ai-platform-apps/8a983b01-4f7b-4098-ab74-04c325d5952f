import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

/**
 * EmptyState component for empty data states
 */
const EmptyState = ({
  title,
  description = null,
  icon = null,
  action = null,
  secondaryAction = null,
  variant = 'default', // default, compact, minimal
  illustration = null, // Custom illustration or image
  className = '',
  ...props
}) => {
  // Default icon if none provided
  const defaultIcon = (
    <svg 
      className="w-12 h-12 text-gray-400" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
      />
    </svg>
  );
  
  // Variant classes
  const variantClasses = {
    default: 'p-8 text-center',
    compact: 'p-4 text-center',
    minimal: 'text-center',
  };
  
  // Render actions
  const renderActions = () => {
    if (!action && !secondaryAction) return null;
    
    return (
      <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
        {action && (
          typeof action === 'string' ? (
            <Button variant="primary">{action}</Button>
          ) : action
        )}
        
        {secondaryAction && (
          typeof secondaryAction === 'string' ? (
            <Button variant="outline">{secondaryAction}</Button>
          ) : secondaryAction
        )}
      </div>
    );
  };
  
  return (
    <div 
      className={`
        border border-gray-200 rounded-lg bg-white
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Illustration or Icon */}
      {illustration ? (
        <div className="mb-4">
          {illustration}
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          {icon || defaultIcon}
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900">
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      )}
      
      {/* Actions */}
      {renderActions()}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  icon: PropTypes.node,
  action: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  secondaryAction: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  variant: PropTypes.oneOf(['default', 'compact', 'minimal']),
  illustration: PropTypes.node,
  className: PropTypes.string,
};

export default EmptyState;