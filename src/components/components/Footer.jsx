import React from 'react';

export const Footer = () => (
  <div className="mt-6 text-center">
    <p className="text-xs text-gray-500">
      By continuing, you agree to our{' '}
      <a 
        href="https://www.zapt.ai/terms" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
      >
        Terms of Service
      </a> and{' '}
      <a 
        href="https://www.zapt.ai/privacy" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
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