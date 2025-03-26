import { createEvent } from '../../../supabaseClient';
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

  try {
    // Run API calls in parallel for better performance
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

    console.log('AI responses received successfully');

    // Validate responses to ensure they match expected structure
    if (!validateResponseStructure(synopsisRes, ['synopsis', 'obligations']) || 
        !synopsisRes.obligations.every(o => o.category && Array.isArray(o.requirements))) {
      console.error('Invalid legislation response structure:', synopsisRes);
      throw new Error('Invalid legislation response structure - expected format not received');
    }
    
    if (!validateResponseStructure(risksRes, ['risks']) || 
        !risksRes.risks.every(validateRiskStructure)) {
      console.error('Invalid risk response structure:', risksRes);
      throw new Error('Invalid risk assessment response structure - expected format not received');
    }
    
    if (!validateResponseStructure(methodRes, ['methodStatement']) || 
        !methodRes.methodStatement.every(validateMethodStructure)) {
      console.error('Invalid method statement structure:', methodRes);
      throw new Error('Invalid method statement response structure - expected format not received');
    }

    // Combine all data into a complete report
    return {
      ...formData,
      generatedAt: new Date().toISOString(),
      legislation: synopsisRes,
      risks: risksRes.risks,
      methodStatement: methodRes.methodStatement
    };
  } catch (error) {
    console.error('Error generating report:', error);
    throw new Error(`Failed to generate report: ${error.message}`);
  }
};