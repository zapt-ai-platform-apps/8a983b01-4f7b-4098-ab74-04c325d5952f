import React from 'react';
import { Tooltip } from '../Tooltip';

const ShareButton = ({ report }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleShare = (method) => {
    const shareText = `Safety Report for ${report.projectName}: ${window.location.href}`;
    
    switch(method) {
      case 'email':
        window.location.href = `mailto:?subject=Safety Report&body=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
        break;
      case 'clipboard':
        navigator.clipboard.writeText(shareText);
        break;
    }
    setShowModal(false);
  };

  return (
    <div className="relative">
      <Tooltip content="Share Report">
        <button
          onClick={() => setShowModal(!showModal)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </Tooltip>
      
      {showModal && (
        <div className="absolute right-0 bottom-10 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
          <button onClick={() => handleShare('email')} className="w-full text-left p-2 hover:bg-gray-100 rounded">
            Email
          </button>
          <button onClick={() => handleShare('whatsapp')} className="w-full text-left p-2 hover:bg-gray-100 rounded">
            WhatsApp
          </button>
          <button onClick={() => handleShare('clipboard')} className="w-full text-left p-2 hover:bg-gray-100 rounded">
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;