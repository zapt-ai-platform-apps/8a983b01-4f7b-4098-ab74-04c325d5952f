export const validateResponseStructure = (response, expectedFields) => {
  if (!response || typeof response !== 'object') return false;
  
  const hasAllFields = expectedFields.every(field => {
    if (!response.hasOwnProperty(field)) return false;
    
    if (field === 'synopsis' && typeof response[field] !== 'string') return false;
    if (field === 'obligations' && !Array.isArray(response[field])) return false;
    if (field === 'risks' && !Array.isArray(response[field])) return false;
    if (field === 'methodStatement' && !Array.isArray(response[field])) return false;
    
    return true;
  });

  return hasAllFields;
};