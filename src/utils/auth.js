import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export const handleSignOut = async (setIsOpen) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Sentry.captureException(error);
      console.error('Sign out error:', error);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error('Sign out exception:', error);
  } finally {
    if (typeof setIsOpen === 'function') {
      setIsOpen(false);
    }
  }
};