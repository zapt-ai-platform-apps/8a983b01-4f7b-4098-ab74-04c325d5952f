import React from 'react';

export const Header = () => (
  <div className="text-center mb-6">
    <div className="mb-4">
      <img 
        src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=96&height=96"
        alt="ZAPT Logo"
        className="h-12 w-12 mx-auto mb-4 rounded-lg"
      />
      <h2 className="text-3xl font-bold text-gray-900 mb-2">H&S Assistant</h2>
      <p className="text-sm text-gray-500">Powered by ZAPT</p>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign in to continue</h3>
    <p className="text-gray-500 text-sm">
      Secure access to your safety reports and compliance tools
    </p>
  </div>
);