import React from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export const UserMenu = ({ user }) => {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Sentry.captureException(error);
        console.error('Sign out error:', error);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error('Sign out exception:', error);
    }
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