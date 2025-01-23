import React, { useState } from 'react';
import { handleSignOut } from '../utils/auth';
import { useCloseMenu } from '../hooks/useCloseMenu';

export const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  useCloseMenu(setIsOpen);

  return (
    <div className="user-menu-container relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group rounded-full p-1 hover:bg-gray-100 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-medium">
          {user.email[0].toUpperCase()}
        </div>
        <svg 
          className={`w-4 h-4 text-gray-600 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-700 truncate">{user.email}</p>
          </div>
          <div className="p-2">
            <button
              onClick={() => handleSignOut(setIsOpen)}
              className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 rounded-md transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};