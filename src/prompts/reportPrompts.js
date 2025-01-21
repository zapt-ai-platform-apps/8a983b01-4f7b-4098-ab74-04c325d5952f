export const createLegislationPrompt = (formData) => 
  `Generate UK health and safety legislation synopsis for construction projects. Focus on ${formData.projectDescription}. 
    Respond in strict JSON format: { 
      "synopsis": "concise overview", 
      "obligations": ["array", "of", "specific", "legal", "requirements"]
    }`;

export const createRiskPrompt = (formData) => 
  `Create risk assessment table for: ${formData.identifiedRisks}. Respond in strict JSON format: { "risks": [{"risk": "", "mitigation": ""}] }`;

export const createMethodPrompt = (formData) => 
  `Create method statement for: ${formData.projectSteps}. Respond in strict JSON format: { "methodStatement": ["step1", "step2"] }`;