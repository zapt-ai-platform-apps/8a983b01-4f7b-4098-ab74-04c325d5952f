import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';

export const AuthModal = () => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <p className="text-center mb-4 text-gray-600">
        Sign in with ZAPT to save and access your reports across devices
      </p>
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        appearance={{
          variables: {
            default: {
              colors: {
                brand: '#2563eb',
                brandAccent: '#1d4ed8',
              },
            },
          },
        }}
      />
      <p className="text-center mt-4 text-sm text-gray-600">
        By continuing, you agree to our{' '}
        <a href="https://www.zapt.ai/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Terms of Service
        </a>
      </p>
    </div>
  </div>
);