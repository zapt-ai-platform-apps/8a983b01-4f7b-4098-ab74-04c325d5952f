import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 text-center text-sm text-gray-500">
      <div className="flex items-center justify-center gap-4">
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-primary-600 transition-colors"
        >
          Made on ZAPT
        </a>
        <span>•</span>
        <a 
          href="https://www.hse.gov.uk/construction/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-primary-600 transition-colors"
        >
          HSE Guidelines
        </a>
        <span>•</span>
        <a 
          href="https://www.zapt.ai/privacy" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-primary-600 transition-colors"
        >
          Privacy
        </a>
      </div>
      <p className="mt-2">© {new Date().getFullYear()} H&S Assistant. All rights reserved.</p>
    </footer>
  );
};

export default Footer;