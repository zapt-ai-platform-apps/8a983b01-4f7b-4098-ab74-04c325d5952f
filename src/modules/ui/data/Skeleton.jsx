import React from 'react';
import PropTypes from 'prop-types';

/**
 * Skeleton component for loading states
 */
const Skeleton = ({
  variant = 'text', // text, rectangular, circular, card
  width,
  height,
  animation = 'pulse', // pulse, wave, none
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'bg-gray-200';
  
  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };
  
  // Variant classes
  const variantClasses = {
    text: 'rounded-md',
    rectangular: '',
    circular: 'rounded-full',
    card: 'rounded-lg',
  };
  
  // Default dimensions based on variant
  const getDefaultDimensions = () => {
    switch (variant) {
      case 'text':
        return { width: '100%', height: '1rem' };
      case 'rectangular':
        return { width: '100%', height: '100px' };
      case 'circular':
        return { width: '40px', height: '40px' };
      case 'card':
        return { width: '100%', height: '200px' };
      default:
        return {};
    }
  };
  
  const defaultDimensions = getDefaultDimensions();
  
  // Inline styles for dimensions
  const style = {
    width: width || defaultDimensions.width,
    height: height || defaultDimensions.height,
    ...props.style,
  };
  
  // Combine all classes
  const skeletonClasses = `
    ${baseClasses}
    ${animationClasses[animation]}
    ${variantClasses[variant]}
    ${className}
  `;
  
  return (
    <div
      className={skeletonClasses}
      style={style}
      {...props}
    />
  );
};

// Multi-line text skeleton
const TextSkeleton = ({ lines = 3, className = '', lineClassName = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 && lines > 1 ? '80%' : '100%'}
          className={lineClassName}
        />
      ))}
    </div>
  );
};

// Card skeleton with title, content and actions
const CardSkeleton = ({ className = '', ...props }) => {
  return (
    <div className={`border border-gray-200 rounded-lg p-4 ${className}`} {...props}>
      <Skeleton variant="text" width="60%" className="mb-4" />
      <TextSkeleton lines={3} className="mb-4" />
      <div className="flex justify-end space-x-2 mt-4">
        <Skeleton variant="text" width="60px" height="35px" />
        <Skeleton variant="text" width="80px" height="35px" />
      </div>
    </div>
  );
};

// Table skeleton
const TableSkeleton = ({ rows = 5, columns = 4, className = '', ...props }) => {
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`} {...props}>
      {/* Table header */}
      <div className="bg-gray-100 p-3 grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={`header-${index}`} variant="text" />
        ))}
      </div>
      
      {/* Table body */}
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className="p-3 grid gap-4" 
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Attach variants to main component
Skeleton.Text = TextSkeleton;
Skeleton.Card = CardSkeleton;
Skeleton.Table = TableSkeleton;

// PropTypes
Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'rectangular', 'circular', 'card']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animation: PropTypes.oneOf(['pulse', 'wave', 'none']),
  className: PropTypes.string,
  style: PropTypes.object,
};

TextSkeleton.propTypes = {
  lines: PropTypes.number,
  className: PropTypes.string,
  lineClassName: PropTypes.string,
};

CardSkeleton.propTypes = {
  className: PropTypes.string,
};

TableSkeleton.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
  className: PropTypes.string,
};

export default Skeleton;