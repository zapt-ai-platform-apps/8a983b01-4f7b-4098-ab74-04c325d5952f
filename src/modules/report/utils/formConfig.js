export const initialFormData = {
  organisationName: '',
  clientName: '',
  projectName: '',
  projectDescription: '',
  organisationRole: '',
  identifiedRisks: '',
  projectSteps: ''
};

export const formFields = [
  {
    name: 'organisationName',
    label: 'Contracting Organisation Name',
    required: true,
    type: 'text',
  },
  {
    name: 'clientName',
    label: 'Client Name',
    required: true,
    type: 'text',
  },
  {
    name: 'projectName',
    label: 'Project Name',
    required: true,
    type: 'text',
  },
  {
    name: 'projectDescription',
    label: 'Project Description',
    required: true,
    type: 'textarea',
    placeholder: 'Provide a detailed description of the project including location, scope, and any specific challenges',
  },
  {
    name: 'organisationRole',
    label: "Contracting Organisation's Role",
    required: true,
    type: 'text',
    placeholder: 'E.g. Principal Contractor, Subcontractor',
  },
  {
    name: 'identifiedRisks',
    label: 'Identified Risks',
    required: false,
    type: 'textarea',
    placeholder: 'List any known risks (e.g. working at height, asbestos, confined spaces)',
  },
  {
    name: 'projectSteps',
    label: 'Project Steps',
    required: true,
    type: 'textarea',
    placeholder: 'Enter each major step in the project workflow, one per line',
  },
];