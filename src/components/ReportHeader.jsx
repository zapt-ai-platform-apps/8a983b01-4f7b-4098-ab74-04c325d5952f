import React from 'react';
import { Tooltip } from './Tooltip';

export const ReportHeader = ({ report, onSave, onNew, saving }) => (
  <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-4">
      <Tooltip content="Back to List">
        <button
          onClick={onNew}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </Tooltip>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {report.projectName} Safety Report
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Generated: {new Date(report.generatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
    <Tooltip content={saving ? "Saving..." : "Save Report"}>
      <button
        onClick={onSave}
        disabled={saving}
        className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
      >
        {saving && (
          <svg 
            className="animate-spin h-5 w-5 text-blue-600 absolute -top-1 -left-1"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      </button>
    </Tooltip>
  </div>
);