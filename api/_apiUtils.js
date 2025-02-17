import { initializeZapt } from '@zapt/zapt-js';
import * as Sentry from '@sentry/node';

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

export async function authenticateUser(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      throw new Error('Invalid authentication token');
    }

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}