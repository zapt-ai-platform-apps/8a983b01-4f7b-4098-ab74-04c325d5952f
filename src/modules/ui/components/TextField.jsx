import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * TextField component for text input
 */
const TextField = forwardRef(({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder = '',
  type = 'text',
  error = null,
  helperText = null,
  required = false,
  disabled = false,
  fullWidth = true,
  size = 'md', // sm, md, lg
  variant = 'outlined', // outlined, filled, standard
  multiline = false,
  rows = 4,
  startIcon = null,
  endIcon = null,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  helperTextClassName = '',
  ...props
}, ref) => {
  // Base classes
  const baseInputClasses = 'block w-full box-border rounded-lg border focus:outline-none focus:ring-2 transition-colors';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-3 px-4',
  };
  
  // Variant classes
  const variantClasses = {
    outlined: 'border-gray-300 bg-white focus:ring-primary-500 focus:border-primary-500',
    filled: 'border-transparent bg-gray-100 focus:ring-primary-500 focus:bg-white focus:border-primary-500',
    standard: 'border-x-0 border-t-0 border-b-2 bg-transparent rounded-none px-0 border-gray-300 focus:ring-0 focus:border-primary-500',
  };
  
  // Error state classes
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  
  // Disabled state classes
  const disabledClasses = disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : '';
  
  // Full width class
  const fullWidthClass = fullWidth ? 'w-full' : '';
  
  // Multiline classes
  const multilineClasses = multiline ? 'resize-none' : '';
  
  // Container classes
  const containerClasses = `mb-4 ${fullWidthClass} ${className}`;
  
  // Combine input classes
  const inputClasses = `
    ${baseInputClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${errorClasses}
    ${disabledClasses}
    ${multilineClasses}
    ${inputClassName}
  `;
  
  // Label classes
  const baseLabelClasses = 'block mb-1.5 font-medium text-gray-700';
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  const combinedLabelClasses = `${baseLabelClasses} ${labelSizeClasses[size]} ${labelClassName}`;
  
  // Error and helper text classes
  const baseHelperTextClasses = 'mt-1.5 text-xs';
  const errorTextClasses = `text-red-600 ${errorClassName}`;
  const helperTextClasses = `text-gray-500 ${helperTextClassName}`;
  
  // Input container for icons
  const InputContainer = ({ children }) => {
    if (!startIcon && !endIcon) return children;
    
    return (
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {startIcon}
          </div>
        )}
        
        {React.cloneElement(children, {
          className: `${children.props.className} ${startIcon ? 'pl-10' : ''} ${endIcon ? 'pr-10' : ''}`
        })}
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            {endIcon}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={id || name} 
          className={combinedLabelClasses}
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      
      <InputContainer>
        {multiline ? (
          <textarea
            id={id || name}
            name={name}
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            className={inputClasses}
            {...props}
          />
        ) : (
          <input
            id={id || name}
            name={name}
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            {...props}
          />
        )}
      </InputContainer>
      
      {(error || helperText) && (
        <p className={`${baseHelperTextClasses} ${error ? errorTextClasses : helperTextClasses}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

TextField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  helperTextClassName: PropTypes.string,
};

export default TextField;