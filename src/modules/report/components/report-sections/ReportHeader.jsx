import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../ui/components/Button';

const ReportHeader = ({ report, onSave, onNew, saving }) => (
  <div className="flex justify-between items-center p-6 bg-gray-50 rounded-t-lg border-b">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">
        {report.projectName}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Health & Safety Report
      </p>
    </div>
    
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        onClick={onNew}
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        }
      >
        Back
      </Button>
      
      <Button
        variant="primary"
        onClick={onSave}
        isLoading={saving}
        isDisabled={saving}
        startIcon={
          !saving && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )
        }
      >
        {saving ? 'Saving...' : 'Save Report'}
      </Button>
    </div>
  </div>
);

ReportHeader.propTypes = {
  report: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onNew: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ReportHeader;