import { createEvent } from '../supabaseClient';

const validateResponseStructure = (response, expectedFields) => {
  if (!response || typeof response !== 'object') return false;
  return expectedFields.every(field => response.hasOwnProperty(field));
};

export const generateReportData = async (formData) => {
  console.log('Starting report generation with data:', formData);
  
  const [synopsisRes, risksRes, methodRes] = await Promise.all([
    createEvent('chatgpt_request', {
      prompt: `Generate UK health and safety legislation synopsis for: ${formData.projectDescription}. Respond in strict JSON format: {synopsis: string, obligations: string[]}`,
      response_type: 'json'
    }),
    createEvent('chatgpt_request', {
      prompt: `Create risk assessment table for: ${formData.identifiedRisks}. Respond in strict JSON format: {risks: {risk: string, mitigation: string}[]}`,
      response_type: 'json'
    }),
    createEvent('chatgpt_request', {
      prompt: `Create method statement for: ${formData.projectSteps}. Respond in strict JSON format: {methodStatement: string[]}`,
      response_type: 'json'
    })
  ]);

  console.log('AI responses received:', { synopsisRes, risksRes, methodRes });

  if (!validateResponseStructure(synopsisRes?.response, ['synopsis', 'obligations'])) {
    throw new Error('Invalid legislation response structure');
  }
  
  if (!validateResponseStructure(risksRes?.response, ['risks'])) {
    throw new Error('Invalid risk assessment response structure');
  }
  
  if (!validateResponseStructure(methodRes?.response, ['methodStatement'])) {
    throw new Error('Invalid method statement response structure');
  }

  return {
    ...formData,
    generatedAt: new Date().toISOString(),
    legislation: synopsisRes.response,
    risks: risksRes.response.risks,
    methodStatement: methodRes.response.methodStatement
  };
};