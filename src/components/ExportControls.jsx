import React from 'react';

const ExportControls = ({ handleExport }) => (
  <div className="flex space-x-4 border-t pt-4">
    <button
      onClick={() => handleExport('word')}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
    >
      Export to Word
    </button>
    <button
      onClick={() => handleExport('text')}
      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
    >
      Copy to Clipboard
    </button>
    <button
      onClick={window.print}
      className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 cursor-pointer"
    >
      Print Report
    </button>
  </div>
);

export default ExportControls;