import { createEvent } from '../supabaseClient';
import { validateResponseStructure } from '../utils/validation';
import { createLegislationPrompt, createRiskPrompt, createMethodPrompt } from '../prompts/reportPrompts';

export const generateReportData = async (formData) => {
  console.log('Starting report generation with data:', formData);

  const [synopsisRes, risksRes, methodRes] = await Promise.all([
    createEvent('chatgpt_request', {
      prompt: createLegislationPrompt(formData),
      response_type: 'json'
    }),
    createEvent('chatgpt_request', {
      prompt: createRiskPrompt(formData),
      response_type: 'json'
    }),
    createEvent('chatgpt_request', {
      prompt: createMethodPrompt(formData),
      response_type: 'json'
    })
  ]);

  console.log('AI responses received:', { synopsisRes, risksRes, methodRes });

  if (!validateResponseStructure(synopsisRes?.response, ['synopsis', 'obligations'])) {
    console.error('Invalid legislation response structure:', synopsisRes?.response);
    throw new Error('Invalid legislation response structure - expected {synopsis: string, obligations: string[]}');
  }
  
  if (!validateResponseStructure(risksRes?.response, ['risks'])) {
    console.error('Invalid risk response structure:', risksRes?.response);
    throw new Error('Invalid risk assessment response structure - expected {risks: {risk: string, mitigation: string}[]}');
  }
  
  if (!validateResponseStructure(methodRes?.response, ['methodStatement'])) {
    console.error('Invalid method statement structure:', methodRes?.response);
    throw new Error('Invalid method statement response structure - expected {methodStatement: string[]}');
  }

  return {
    ...formData,
    generatedAt: new Date().toISOString(),
    legislation: synopsisRes.response,
    risks: risksRes.response.risks,
    methodStatement: methodRes.response.methodStatement
  };
};