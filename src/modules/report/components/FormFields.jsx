import React from 'react';
import FormField from './FormField';
import PropTypes from 'prop-types';

const FormFields = ({ formData, setFormData, errors = {} }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  return (
    <div className="space-y-4">
      <FormField
        label="Contracting Organisation Name"
        name="organisationName"
        value={formData.organisationName}
        onChange={(value) => handleChange('organisationName', value)}
        required
        error={errors.organisationName}
      />

      <FormField
        label="Client Name"
        name="clientName"
        value={formData.clientName}
        onChange={(value) => handleChange('clientName', value)}
        required
        error={errors.clientName}
      />

      <FormField
        label="Project Name"
        name="projectName"
        value={formData.projectName}
        onChange={(value) => handleChange('projectName', value)}
        required
        error={errors.projectName}
      />

      <FormField
        label="Project Description"
        name="projectDescription"
        value={formData.projectDescription}
        onChange={(value) => handleChange('projectDescription', value)}
        isTextArea
        required
        placeholder="Provide a detailed description of the project including location, scope, and any specific challenges"
        error={errors.projectDescription}
      />

      <FormField
        label="Contracting Organisation's Role"
        name="organisationRole"
        value={formData.organisationRole}
        onChange={(value) => handleChange('organisationRole', value)}
        required
        placeholder="E.g. Principal Contractor, Subcontractor"
        error={errors.organisationRole}
      />

      <FormField
        label="Identified Risks"
        name="identifiedRisks"
        value={formData.identifiedRisks}
        onChange={(value) => handleChange('identifiedRisks', value)}
        isTextArea
        placeholder="List any known risks (e.g. working at height, asbestos, confined spaces)"
        error={errors.identifiedRisks}
      />

      <FormField
        label="Project Steps"
        name="projectSteps"
        value={formData.projectSteps}
        onChange={(value) => handleChange('projectSteps', value)}
        isTextArea
        required
        placeholder="Enter each major step in the project workflow, one per line"
        error={errors.projectSteps}
      />
    </div>
  );
};

FormFields.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default FormFields;