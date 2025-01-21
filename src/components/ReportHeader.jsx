import React from 'react';

export const ReportHeader = ({ report, onSave, onNew }) => (
  <div className="flex justify-between mb-6">
    <h2 className="text-2xl font-semibold text-gray-800">
      {report.projectName} Safety Report
    </h2>
    <div className="space-x-4">
      <button
        onClick={onSave}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
      >
        Save Report
      </button>
      <button
        onClick={onNew}
        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
      >
        New Report
      </button>
    </div>
  </div>
);