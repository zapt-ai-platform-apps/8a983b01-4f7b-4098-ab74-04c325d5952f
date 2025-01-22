import React from 'react';

const SavedReportsList = ({ reports, onSelect }) => {
  if (!reports?.length) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Saved Reports</h2>
      <div className="space-y-3">
        {reports.map((report, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelect(report)}
          >
            <h3 className="font-medium text-gray-800">{report.projectName}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {report.organisationName} → {report.clientName}
            </p>
            <div className="text-xs text-gray-400 mt-2">
              Last updated: {new Date(report.generatedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedReportsList;