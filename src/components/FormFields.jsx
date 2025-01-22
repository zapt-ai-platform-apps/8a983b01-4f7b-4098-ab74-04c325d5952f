import React from 'react';
import FormField from './FormField';

const FormFields = ({ formData, setFormData }) => {
  return (
    <>
      <FormField
        label="Contracting Organisation Name *"
        name="organisationName"
        value={formData.organisationName}
        onChange={(value) => setFormData(prev => ({...prev, organisationName: value}))}
        required
      />

      <FormField
        label="Client Name *"
        name="clientName"
        value={formData.clientName}
        onChange={(value) => setFormData(prev => ({...prev, clientName: value}))}
        required
      />

      <FormField
        label="Project Name *"
        name="projectName"
        value={formData.projectName}
        onChange={(value) => setFormData(prev => ({...prev, projectName: value}))}
        required
      />

      <FormField
        label="Project Description *"
        name="projectDescription"
        value={formData.projectDescription}
        onChange={(value) => setFormData(prev => ({...prev, projectDescription: value}))}
        isTextArea
        required
      />

      <FormField
        label="Contracting Organisation's Role *"
        name="organisationRole"
        value={formData.organisationRole}
        onChange={(value) => setFormData(prev => ({...prev, organisationRole: value}))}
        required
        placeholder="E.g. Principal Contractor, Subcontractor"
      />

      <FormField
        label="Identified Risks"
        name="identifiedRisks"
        value={formData.identifiedRisks}
        onChange={(value) => setFormData(prev => ({...prev, identifiedRisks: value}))}
        isTextArea
        placeholder="List any known risks (e.g. working at height, asbestos)"
      />

      <FormField
        label="Project Steps *"
        name="projectSteps"
        value={formData.projectSteps}
        onChange={(value) => setFormData(prev => ({...prev, projectSteps: value}))}
        isTextArea
        required
        placeholder="Enter each step on a new line"
      />
    </>
  );
};

export default FormFields;