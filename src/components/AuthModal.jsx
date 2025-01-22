import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { appearance } from './constants';

export const AuthModal = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-all duration-300 hover:shadow-2xl">
      <Header />
      
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        appearance={appearance}
      />

      <Footer />
    </div>
  </div>
);