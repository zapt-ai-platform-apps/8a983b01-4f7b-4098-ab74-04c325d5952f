import React from 'react';

const SavedReportsList = ({ reports, onSelect }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Saved Reports</h2>
      <div className="space-y-3">
        {reports?.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.id}
              className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelect(report)}
            >
              <h3 className="font-medium text-gray-800">{report.title}</h3>
              <div className="text-xs text-gray-400 mt-2">
                Created: {new Date(report.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No saved reports found
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedReportsList;