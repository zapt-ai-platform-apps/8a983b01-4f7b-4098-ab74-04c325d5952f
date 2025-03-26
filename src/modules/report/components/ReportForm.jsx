import React, { useState } from 'react';
import { initialFormData } from '../utils/formConfig';
import Alert from '../../ui/components/Alert';
import Button from '../../ui/components/Button';
import FormFields from './FormFields';
import Card from '../../ui/components/Card';
import PropTypes from 'prop-types';

const ReportForm = ({ onSubmit, onCancel, loading, error }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.organisationName.trim()) {
      newErrors.organisationName = 'Organisation name is required';
    }
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    } else if (formData.projectDescription.trim().length < 20) {
      newErrors.projectDescription = 'Project description must be at least 20 characters';
    }
    
    if (!formData.organisationRole.trim()) {
      newErrors.organisationRole = 'Organisation role is required';
    }
    
    if (!formData.projectSteps.trim()) {
      newErrors.projectSteps = 'Project steps are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-4 animate-fadeIn">
      <Card variant="elevated" className="mb-8">
        <Card.Header>
          <div className="flex justify-between items-center">
            <Card.Title>Create New Safety Report</Card.Title>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Card.Header>
        
        <Card.Content>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert 
                severity="error" 
                title="Error"
                variant="standard"
              >
                {error}
              </Alert>
            )}
            
            {loading && (
              <Alert 
                severity="info" 
                title="Generating Report"
                variant="standard"
              >
                This may take up to 30 seconds. Please wait while we analyze your project data and create a comprehensive report.
              </Alert>
            )}

            <FormFields 
              formData={formData} 
              setFormData={setFormData} 
              errors={errors}
            />
            
            <Card.Actions>
              <Button
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                isDisabled={loading}
              >
                Generate Safety Report
              </Button>
            </Card.Actions>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};

ReportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default ReportForm;