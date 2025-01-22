import React from 'react';

export const SubmitButton = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer transition-colors"
    >
      {loading ? 'Generating Report...' : 'Generate Safety Report'}
    </button>
  );
};