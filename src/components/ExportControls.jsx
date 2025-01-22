import React from 'react';
import { Tooltip } from './Tooltip';
import ShareButton from './ExportControls/ShareButton';

const ExportControls = ({ handleExport }) => (
  <div className="flex justify-between items-center border-t pt-4 mt-8">
    <div className="flex space-x-4">
      <Tooltip content="Export to Word">
        <button
          onClick={() => handleExport('word')}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.4145.414A1 1 0 0119 5.414V21a2 2 0 01-2 2z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Copy to Clipboard">
        <button
          onClick={() => handleExport('text')}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Print Report">
        <button
          onClick={window.print}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
      </Tooltip>
    </div>
    <ShareButton report={handleExport} />
  </div>
);

export default ExportControls;