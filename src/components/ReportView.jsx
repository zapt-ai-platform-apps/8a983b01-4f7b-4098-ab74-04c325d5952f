import React from 'react';
import { LegalRequirements } from './LegalRequirements';
import { RiskAssessment } from './RiskAssessment';
import { MethodStatement } from './MethodStatement';
import { ExportControls } from './ExportControls';
import { handleExport } from '../utils/exportHandler';
import { ReportHeader } from './ReportHeader';

const ReportView = ({ report, onSave, onNew }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <ReportHeader report={report} onSave={onSave} onNew={onNew} />
      
      <LegalRequirements legislation={report.legislation} />
      <RiskAssessment risks={report.risks} />
      <MethodStatement methodStatement={report.methodStatement} />
      <ExportControls handleExport={(format) => handleExport(format, report)} />
    </div>
  );
};

export default ReportView;