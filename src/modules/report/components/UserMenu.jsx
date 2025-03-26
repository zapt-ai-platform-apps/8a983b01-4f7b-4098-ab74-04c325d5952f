import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { useCloseMenu } from '../hooks/useCloseMenu';
import Button from '../../ui/components/Button';

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use custom hook for closing menu on outside click
  useCloseMenu(setIsOpen);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="user-menu-container relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group rounded-full p-1 hover:bg-gray-100 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-600 text-white font-medium">
          {user.email?.[0].toUpperCase() || 'U'}
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
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-fadeIn">
          <div className="p-4 border-b border-gray-100">
            <div className="font-medium text-gray-800">{user.email?.split('@')[0]}</div>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          <div className="p-2">
            <Button
              variant="text"
              color="error"
              onClick={handleSignOut}
              isFullWidth
              startIcon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
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
              }
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;