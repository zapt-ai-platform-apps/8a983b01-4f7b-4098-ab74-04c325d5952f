import React from 'react';
import { Tooltip } from './Tooltip';

export const ReportHeader = ({ report, onSave, onNew }) => (
  <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">
        {report.projectName} Safety Report
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Generated: {new Date(report.generatedAt).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Contracting Organisation: {report.organisationName} | Client: {report.clientName} ({report.organisationRole})
      </p>
    </div>
    <div className="flex space-x-4">
      <Tooltip content="Save Report">
        <button
          onClick={onSave}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="New Report">
        <button
          onClick={onNew}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        </button>
      </Tooltip>
    </div>
  </div>
);