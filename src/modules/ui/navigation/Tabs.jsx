import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Tabs component for creating tabbed interfaces
 */
const Tabs = ({
  tabs,
  value,
  onChange,
  variant = 'default', // default, contained, vertical
  className = '',
  tabClassName = '',
  tabsContainerClassName = '',
  tabPanelClassName = '',
  ...props
}) => {
  // Base classes
  const baseTabsContainerClasses = 'flex transition-all';
  const baseTabClasses = 'font-medium transition-all cursor-pointer outline-none focus:ring-2 focus:ring-primary-500';
  const baseTabPanelClasses = 'outline-none';
  
  // Variant specific classes
  const variantTabsContainerClasses = {
    default: 'border-b border-gray-200 gap-6',
    contained: 'bg-gray-100 rounded-lg p-1 gap-1',
    vertical: 'flex-col border-r border-gray-200 gap-2 pr-4',
  };
  
  const variantTabClasses = {
    default: 'text-gray-500 hover:text-gray-800 pb-3 px-1 -mb-px',
    contained: 'rounded-md px-4 py-2 text-gray-500 hover:text-gray-800',
    vertical: 'text-gray-500 hover:text-gray-800 py-2 px-4 rounded-l-md',
  };
  
  // Active tab classes
  const activeTabClasses = {
    default: 'text-primary-600 border-b-2 border-primary-600',
    contained: 'text-primary-600 bg-white shadow-sm',
    vertical: 'text-primary-600 bg-gray-100 border-r-2 border-primary-600',
  };
  
  // Combined classes
  const tabsContainerClasses = `
    ${baseTabsContainerClasses}
    ${variantTabsContainerClasses[variant]}
    ${tabsContainerClassName}
  `;
  
  // Render the tabs
  return (
    <div className={className} {...props}>
      {/* Tabs container */}
      <div 
        role="tablist"
        className={tabsContainerClasses}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            id={`tab-${tab.value}`}
            role="tab"
            aria-selected={value === tab.value}
            aria-controls={`tabpanel-${tab.value}`}
            className={`
              ${baseTabClasses}
              ${variantTabClasses[variant]}
              ${value === tab.value ? activeTabClasses[variant] : ''}
              ${tabClassName}
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => !tab.disabled && onChange(tab.value)}
            disabled={tab.disabled}
            tabIndex={value === tab.value ? 0 : -1}
          >
            {tab.icon && (
              <span className="mr-2">{tab.icon}</span>
            )}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab panels */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            id={`tabpanel-${tab.value}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.value}`}
            hidden={value !== tab.value}
            className={`${baseTabPanelClasses} ${tabPanelClassName}`}
            tabIndex={0}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// TabItem component for declarative usage
const TabItem = ({ label, value, icon, disabled, children }) => {
  return children;
};

// Attach TabItem as property
Tabs.Item = TabItem;

// PropTypes
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
      content: PropTypes.node,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'contained', 'vertical']),
  className: PropTypes.string,
  tabClassName: PropTypes.string,
  tabsContainerClassName: PropTypes.string,
  tabPanelClassName: PropTypes.string,
};

TabItem.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

// Custom hook for controlled tabs
export const useTabs = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  return {
    value,
    onChange: handleChange,
  };
};

export default Tabs;