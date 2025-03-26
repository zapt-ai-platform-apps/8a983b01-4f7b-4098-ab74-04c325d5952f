import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pagination component for navigating through pages
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  className = '',
  size = 'md', // sm, md, lg
  shape = 'rounded', // rounded, circular, square
  variant = 'outlined', // outlined, contained
  showFirstButton = true,
  showLastButton = true,
  showPrevButton = true,
  showNextButton = true,
  labelFirstButton = '«',
  labelPrevButton = '‹',
  labelNextButton = '›',
  labelLastButton = '»',
  ...props
}) => {
  // Helper to generate page range with ellipses
  const getPageRange = () => {
    const range = [];
    const leftBoundary = boundaryCount;
    const rightBoundary = totalPages - boundaryCount + 1;
    const leftSiblings = Math.max(currentPage - siblingCount, leftBoundary + 1);
    const rightSiblings = Math.min(currentPage + siblingCount, rightBoundary - 1);
    
    // Add boundary pages and siblings
    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= leftBoundary ||
        i >= rightBoundary ||
        (i >= leftSiblings && i <= rightSiblings)
      ) {
        range.push(i);
      } else if (i === leftSiblings - 1 || i === rightSiblings + 1) {
        range.push('ellipsis');
      }
    }
    
    return range.filter((item, index, array) => 
      item === 'ellipsis' ? array[index - 1] !== 'ellipsis' : true
    );
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };
  
  // Shape classes
  const shapeClasses = {
    rounded: 'rounded-md',
    circular: 'rounded-full',
    square: '',
  };
  
  // Variant classes
  const variantClasses = {
    outlined: 'border border-gray-300 bg-white hover:bg-gray-50',
    contained: 'bg-gray-100 hover:bg-gray-200',
  };
  
  // Active page classes
  const activeClasses = 'bg-primary-600 text-white hover:bg-primary-700 border-primary-600';
  
  // Disabled button classes
  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
  
  // Base button classes
  const buttonBaseClasses = `
    flex items-center justify-center 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
    transition-colors
  `;
  
  // Get the page range
  const pageRange = getPageRange();
  
  return (
    <nav
      className={`flex items-center justify-center ${className}`}
      aria-label="Pagination"
      {...props}
    >
      <ul className="flex items-center space-x-1">
        {/* First page button */}
        {showFirstButton && (
          <li>
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className={`
                ${buttonBaseClasses}
                ${sizeClasses[size]}
                ${shapeClasses[shape]}
                ${variantClasses[variant]}
                ${currentPage === 1 ? disabledClasses : ''}
              `}
              aria-label="Go to first page"
            >
              {labelFirstButton}
            </button>
          </li>
        )}
        
        {/* Previous page button */}
        {showPrevButton && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                ${buttonBaseClasses}
                ${sizeClasses[size]}
                ${shapeClasses[shape]}
                ${variantClasses[variant]}
                ${currentPage === 1 ? disabledClasses : ''}
              `}
              aria-label="Go to previous page"
            >
              {labelPrevButton}
            </button>
          </li>
        )}
        
        {/* Page numbers */}
        {pageRange.map((page, index) => (
          <li key={index}>
            {page === 'ellipsis' ? (
              <span className={`
                flex items-center justify-center 
                ${sizeClasses[size]}
                text-gray-500
              `}>
                …
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`
                  ${buttonBaseClasses}
                  ${sizeClasses[size]}
                  ${shapeClasses[shape]}
                  ${page === currentPage ? activeClasses : variantClasses[variant]}
                `}
                aria-current={page === currentPage ? 'page' : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        {/* Next page button */}
        {showNextButton && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                ${buttonBaseClasses}
                ${sizeClasses[size]}
                ${shapeClasses[shape]}
                ${variantClasses[variant]}
                ${currentPage === totalPages ? disabledClasses : ''}
              `}
              aria-label="Go to next page"
            >
              {labelNextButton}
            </button>
          </li>
        )}
        
        {/* Last page button */}
        {showLastButton && (
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`
                ${buttonBaseClasses}
                ${sizeClasses[size]}
                ${shapeClasses[shape]}
                ${variantClasses[variant]}
                ${currentPage === totalPages ? disabledClasses : ''}
              `}
              aria-label="Go to last page"
            >
              {labelLastButton}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number,
  boundaryCount: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  shape: PropTypes.oneOf(['rounded', 'circular', 'square']),
  variant: PropTypes.oneOf(['outlined', 'contained']),
  showFirstButton: PropTypes.bool,
  showLastButton: PropTypes.bool,
  showPrevButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  labelFirstButton: PropTypes.node,
  labelPrevButton: PropTypes.node,
  labelNextButton: PropTypes.node,
  labelLastButton: PropTypes.node,
};

export default Pagination;