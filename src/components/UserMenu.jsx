import React from 'react';
import { supabase } from '../supabaseClient';

export const UserMenu = ({ user }) => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Sign out error:', error);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600 hidden sm:inline">
        Signed in as {user.email}
      </span>
      <button
        onClick={handleSignOut}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
};