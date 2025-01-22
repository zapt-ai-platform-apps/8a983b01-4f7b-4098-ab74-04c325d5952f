import React from 'react';

export const Tooltip = ({ content, children }) => (
  <div className="relative group">
    {children}
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      {content}
      <svg className="absolute top-full left-1/2 -translate-x-1/2" width="8" height="8" viewBox="0 0 8 8">
        <path fill="currentColor" d="M0 0 L8 0 L4 8 z" />
      </svg>
    </span>
  </div>
);