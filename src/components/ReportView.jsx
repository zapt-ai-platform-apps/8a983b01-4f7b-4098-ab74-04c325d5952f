import React from 'react';
import { createEvent } from '../supabaseClient';
import LegalRequirements from './LegalRequirements';
import RiskAssessment from './RiskAssessment';
import MethodStatement from './MethodStatement';
import ExportControls from './ExportControls';

const ReportView = ({ report, onSave, onNew }) => {
  const handleExport = async (format) => {
    try {
      const { response } = await createEvent('chatgpt_request', {
        prompt: `Convert this report to ${format} format: ${JSON.stringify(report)}`,
        response_type: 'text'
      });
      
      if (format === 'word') {
        const blob = new Blob([response], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.projectName}_Safety_Report.doc`;
        a.click();
      } else {
        navigator.clipboard.writeText(response);
      }
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
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

      <LegalRequirements legislation={report.legislation} />
      <RiskAssessment risks={report.risks} />
      <MethodStatement methodStatement={report.methodStatement} />
      <ExportControls handleExport={handleExport} />
    </div>
  );
};

export default ReportView;