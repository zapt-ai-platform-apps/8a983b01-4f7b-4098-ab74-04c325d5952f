import React from 'react';
import PropTypes from 'prop-types';

/**
 * Breadcrumbs component for navigation hierarchy
 */
const Breadcrumbs = ({
  items,
  separator = '/',
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  className = '',
  activeClassName = '',
  separatorClassName = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'flex items-center flex-wrap';
  
  // Should we collapse any items?
  const shouldCollapse = maxItems > 0 && items.length > maxItems;
  
  // Get visible items based on collapse settings
  const visibleItems = shouldCollapse
    ? [
        ...items.slice(0, itemsBeforeCollapse),
        { label: '...', link: null },
        ...items.slice(items.length - itemsAfterCollapse)
      ]
    : items;
  
  return (
    <nav aria-label="Breadcrumb" className={`${baseClasses} ${className}`} {...props}>
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isCollapsed = item.label === '...';
          
          // Base classes for all items
          const itemClasses = `
            text-sm 
            ${isLast ? `font-medium ${activeClassName}` : 'text-gray-500 hover:text-gray-700'}
          `;
          
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                {isCollapsed ? (
                  <span className="text-gray-500">...</span>
                ) : (
                  <>
                    {item.link && !isLast ? (
                      <a href={item.link} className="hover:underline">
                        {item.icon && (
                          <span className="mr-1">{item.icon}</span>
                        )}
                        {item.label}
                      </a>
                    ) : (
                      <span aria-current={isLast ? 'page' : undefined}>
                        {item.icon && (
                          <span className="mr-1">{item.icon}</span>
                        )}
                        {item.label}
                      </span>
                    )}
                  </>
                )}
              </li>
              
              {!isLast && (
                <li className={`text-gray-400 mx-1 ${separatorClassName}`}>
                  {typeof separator === 'string' ? separator : separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
      icon: PropTypes.node,
    })
  ).isRequired,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  maxItems: PropTypes.number,
  itemsBeforeCollapse: PropTypes.number,
  itemsAfterCollapse: PropTypes.number,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  separatorClassName: PropTypes.string,
};

export default Breadcrumbs;