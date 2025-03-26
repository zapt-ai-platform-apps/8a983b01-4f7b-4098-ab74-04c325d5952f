import React from 'react';
import UserMenu from './UserMenu';
import { theme } from '../../core/theme';

const Header = ({ user }) => {
  return (
    <header className="py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=48&height=48"
          alt="H&S Assistant"
          className="h-10 w-10 rounded-lg"
        />
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary-800">H&S Assistant</h1>
          <p className="text-xs text-gray-500">UK Construction Compliance Tool</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
};

export default Header;