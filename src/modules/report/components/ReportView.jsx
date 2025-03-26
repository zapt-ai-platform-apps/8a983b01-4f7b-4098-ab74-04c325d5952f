import React from 'react';
import PropTypes from 'prop-types';
import LegalRequirements from './report-sections/LegalRequirements';
import RiskAssessment from './report-sections/RiskAssessment';
import MethodStatement from './report-sections/MethodStatement';
import ExportControls from './export/ExportControls';
import { handleExport } from '../utils/exportHandler';
import ReportHeader from './report-sections/ReportHeader';
import Card from '../../ui/components/Card';
import Button from '../../ui/components/Button';
import Breadcrumbs from '../../ui/navigation/Breadcrumbs';
import Tabs, { useTabs } from '../../ui/navigation/Tabs';

const ReportView = ({ report, onSave, onNew, saving }) => {
  const tabs = useTabs('legal');
  
  const renderProjectDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-500 mb-1">Client</h4>
          <p className="text-gray-800">{report.clientName}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-500 mb-1">Organisation</h4>
          <p className="text-gray-800">{report.organisationName}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-500 mb-1">Role</h4>
          <p className="text-gray-800">{report.organisationRole}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-500 mb-1">Generated</h4>
          <p className="text-gray-800">{new Date(report.generatedAt).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-500 mb-1">Project Description</h4>
        <p className="text-gray-800">{report.projectDescription}</p>
      </div>
    </div>
  );
  
  return (
    <div className="animate-fadeIn mt-4 mx-auto max-w-5xl">
      <Breadcrumbs 
        items={[
          { label: 'Reports', link: '#' },
          { label: report.projectName || 'Report Details' }
        ]}
        className="mb-4"
      />
      
      <Card variant="elevated" className="mb-8">
        <ReportHeader 
          report={report} 
          onSave={onSave} 
          onNew={onNew} 
          saving={saving} 
        />
        
        <Card.Content>
          <Tabs
            value={tabs.value}
            onChange={tabs.onChange}
            tabs={[
              {
                label: 'Legal Requirements',
                value: 'legal',
                content: <LegalRequirements legislation={report.legislation} />
              },
              {
                label: 'Risk Assessment',
                value: 'risks',
                content: <RiskAssessment risks={report.risks} />
              },
              {
                label: 'Method Statement',
                value: 'method',
                content: <MethodStatement methodStatement={report.methodStatement} />
              },
              {
                label: 'Project Details',
                value: 'details',
                content: renderProjectDetails()
              }
            ]}
          />
          
          <ExportControls handleExport={(format) => handleExport(format, report)} />
        </Card.Content>
      </Card>
    </div>
  );
};

ReportView.propTypes = {
  report: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onNew: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ReportView;