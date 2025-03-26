import React from 'react';
import PropTypes from 'prop-types';

/**
 * Container component for layout control
 */
const Container = ({
  children,
  maxWidth = 'lg', // xs, sm, md, lg, xl, 2xl, full
  padding = true,
  className = '',
  ...props
}) => {
  // Maximum width classes
  const maxWidthClasses = {
    xs: 'max-w-screen-sm',
    sm: 'max-w-screen-md',
    md: 'max-w-screen-lg',
    lg: 'max-w-screen-xl',
    xl: 'max-w-screen-2xl',
    '2xl': 'max-w-[1536px]',
    full: 'max-w-full',
  };
  
  // Padding classes
  const paddingClasses = padding ? 'px-4 sm:px-6 md:px-8' : '';
  
  // Combine all classes
  const containerClasses = `
    w-full mx-auto
    ${maxWidthClasses[maxWidth]}
    ${paddingClasses}
    ${className}
  `;
  
  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full']),
  padding: PropTypes.bool,
  className: PropTypes.string,
};

export default Container;