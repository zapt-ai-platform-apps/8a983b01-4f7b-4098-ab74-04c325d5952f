import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';

/**
 * Search component for filtering data
 */
const Search = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  variant = 'outlined',
  size = 'md',
  className = '',
  debounce = 300,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const [timer, setTimer] = useState(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    
    // Update parent state immediately if no debounce
    if (debounce <= 0) {
      onChange(newValue);
      if (onSearch) onSearch(newValue);
      return;
    }
    
    // Otherwise debounce the search
    if (timer) clearTimeout(timer);
    
    const newTimer = setTimeout(() => {
      onChange(newValue);
      if (onSearch) onSearch(newValue);
    }, debounce);
    
    setTimer(newTimer);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      clearTimeout(timer);
      onSearch(internalValue);
    }
  };

  const handleClear = () => {
    setInternalValue('');
    onChange('');
    if (onSearch) onSearch('');
  };

  return (
    <TextField
      value={internalValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      variant={variant}
      size={size}
      className={className}
      startIcon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      }
      endIcon={
        internalValue ? (
          <button 
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null
      }
      {...props}
    />
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  debounce: PropTypes.number,
};

export default Search;