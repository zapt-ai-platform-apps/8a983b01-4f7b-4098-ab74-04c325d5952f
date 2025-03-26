export const validateResponseStructure = (response, expectedFields) => {
  if (!response || typeof response !== 'object') {
    console.error('Invalid response - not an object:', response);
    return false;
  }
  
  const hasAllFields = expectedFields.every(field => {
    if (!response.hasOwnProperty(field)) {
      console.error(`Missing expected field: ${field}`, response);
      return false;
    }
    
    if (field === 'synopsis' && typeof response[field] !== 'string') {
      console.error(`Field 'synopsis' is not a string`, response[field]);
      return false;
    }
    
    if (field === 'obligations' && !Array.isArray(response[field])) {
      console.error(`Field 'obligations' is not an array`, response[field]);
      return false;
    }
    
    if (field === 'risks' && !Array.isArray(response[field])) {
      console.error(`Field 'risks' is not an array`, response[field]);
      return false;
    }
    
    if (field === 'methodStatement' && !Array.isArray(response[field])) {
      console.error(`Field 'methodStatement' is not an array`, response[field]);
      return false;
    }
    
    return true;
  });

  return hasAllFields;
};

export const validateFormData = (formData) => {
  const errors = {};
  
  if (!formData.organisationName.trim()) {
    errors.organisationName = 'Organisation name is required';
  }
  
  if (!formData.clientName.trim()) {
    errors.clientName = 'Client name is required';
  }
  
  if (!formData.projectName.trim()) {
    errors.projectName = 'Project name is required';
  }
  
  if (!formData.projectDescription.trim()) {
    errors.projectDescription = 'Project description is required';
  } else if (formData.projectDescription.length < 20) {
    errors.projectDescription = 'Project description should be at least 20 characters';
  }
  
  if (!formData.organisationRole.trim()) {
    errors.organisationRole = 'Organisation role is required';
  }
  
  if (!formData.projectSteps.trim()) {
    errors.projectSteps = 'Project steps are required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};