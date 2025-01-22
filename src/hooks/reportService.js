import { createEvent } from '../supabaseClient';
import { validateResponseStructure } from '../utils/validation';
import { createLegislationPrompt, createRiskPrompt, createMethodPrompt } from '../prompts/reportPrompts';

const validateRiskStructure = (risk) => {
  return risk.risk && risk.severity && risk.mitigation && Array.isArray(risk.legalReferences);
};

const validateMethodStructure = (method) => {
  return method.step && method.details && typeof method.details === 'object';
};

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

  if (!validateResponseStructure(synopsisRes, ['synopsis', 'obligations']) || 
      !synopsisRes.obligations.every(o => o.category && Array.isArray(o.requirements))) {
    console.error('Invalid legislation response structure:', synopsisRes);
    throw new Error('Invalid legislation response structure - expected {synopsis: string, obligations: {category: string, requirements: string[]}[]}');
  }
  
  if (!validateResponseStructure(risksRes, ['risks']) || 
      !risksRes.risks.every(validateRiskStructure)) {
    console.error('Invalid risk response structure:', risksRes);
    throw new Error('Invalid risk assessment response structure - expected {risks: {risk: string, severity: string, mitigation: string, legalReferences: string[]}[]}');
  }
  
  if (!validateResponseStructure(methodRes, ['methodStatement']) || 
      !methodRes.methodStatement.every(validateMethodStructure)) {
    console.error('Invalid method statement structure:', methodRes);
    throw new Error('Invalid method statement response structure - expected {methodStatement: {step: string, details: object}[]}');
  }

  return {
    ...formData,
    generatedAt: new Date().toISOString(),
    legislation: synopsisRes,
    risks: risksRes.risks,
    methodStatement: methodRes.methodStatement
  };
};