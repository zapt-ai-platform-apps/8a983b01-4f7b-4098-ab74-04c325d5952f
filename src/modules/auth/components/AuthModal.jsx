import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../../../supabaseClient';
import { appearance } from './constants';
import Card from '../../ui/components/Card';

const AuthHeader = () => (
  <div className="text-center mb-6">
    <div className="mb-4">
      <img 
        src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=96&height=96"
        alt="H&S Assistant Logo"
        className="h-14 w-14 mx-auto mb-4 rounded-lg"
      />
      <h2 className="text-3xl font-bold text-gray-900 mb-2">H&S Assistant</h2>
      <p className="text-sm text-gray-500">UK Construction Compliance Tool</p>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign in to continue</h3>
    <p className="text-gray-500 text-sm mb-4">
      Secure access to your safety reports and compliance tools
    </p>
  </div>
);

const AuthFooter = () => (
  <div className="mt-6 text-center">
    <p className="text-xs text-gray-500">
      By continuing, you agree to our{' '}
      <a 
        href="https://www.zapt.ai/terms" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-primary-600 hover:text-primary-800 transition-colors font-medium"
      >
        Terms of Service
      </a> and{' '}
      <a 
        href="https://www.zapt.ai/privacy" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-primary-600 hover:text-primary-800 transition-colors font-medium"
      >
        Privacy Policy
      </a>
    </p>
    <div className="mt-4 border-t pt-4">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        © {new Date().getFullYear()} ZAPT Technologies
      </a>
    </div>
  </div>
);

const AuthModal = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
    <Card 
      variant="elevated" 
      className="max-w-md w-full transform transition-all duration-300 hover:shadow-xl animate-fadeInUp"
      padding="large"
    >
      <AuthHeader />
      
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        appearance={appearance}
        magicLink={true}
        view="magic_link"
        showLinks={true}
      />

      <AuthFooter />
    </Card>
  </div>
);

export default AuthModal;