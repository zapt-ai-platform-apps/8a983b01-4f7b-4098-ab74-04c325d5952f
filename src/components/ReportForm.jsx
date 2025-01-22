import React, { useState } from 'react';
import FormField from './FormField';
import { initialFormData } from '../utils/formConfig';
import { ErrorMessage } from './ErrorMessage';
import { SubmitButton } from './SubmitButton';

const ReportForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      {error && <ErrorMessage error={error} />}

      <div className="space-y-6">
        <FormField
          label="Organisation Name *"
          name="organisationName"
          value={formData.organisationName}
          onChange={(value) => setFormData({...formData, organisationName: value})}
          required
        />

        <FormField
          label="Project Name *"
          name="projectName"
          value={formData.projectName}
          onChange={(value) => setFormData({...formData, projectName: value})}
          required
        />

        <FormField
          label="Project Description *"
          name="projectDescription"
          value={formData.projectDescription}
          onChange={(value) => setFormData({...formData, projectDescription: value})}
          isTextArea
          required
        />

        <FormField
          label="Organisation's Role"
          name="organisationRole"
          value={formData.organisationRole}
          onChange={(value) => setFormData({...formData, organisationRole: value})}
        />

        <FormField
          label="Identified Risks"
          name="identifiedRisks"
          value={formData.identifiedRisks}
          onChange={(value) => setFormData({...formData, identifiedRisks: value})}
          isTextArea
          placeholder="List any known risks (e.g. working at height, asbestos)"
        />

        <FormField
          label="Project Steps *"
          name="projectSteps"
          value={formData.projectSteps}
          onChange={(value) => setFormData({...formData, projectSteps: value})}
          isTextArea
          required
          placeholder="Enter each step on a new line"
        />

        <SubmitButton loading={loading} />
      </div>
    </form>
  );
};

export default ReportForm;