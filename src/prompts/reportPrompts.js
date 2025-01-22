export const createLegislationPrompt = (formData) => 
  `Analyze UK construction health and safety requirements for: ${formData.projectDescription}.
   Include:
   - Health and Safety at Work Act 1974 (HSWA) obligations
   - Construction (Design and Management) Regulations 2015 (CDM)
   - Work at Height Regulations 2005
   - Provision and Use of Work Equipment Regulations 1998 (PUWER)
   - Control of Substances Hazardous to Health Regulations 2002 (COSHH)
   - Relevant British Standards (BS) and European Norms (EN)
   - HSE guidance notes
   - Industry best practices
  
   Respond in strict JSON format: {
     "synopsis": "comprehensive legal overview", 
     "obligations": [{
       "category": "Primary Legislation",
       "requirements": ["list", "of", "specific", "clauses"]
     }, {
       "category": "Secondary Regulations", 
       "requirements": []
     }, {
       "category": "Guidance Documents",
       "requirements": []
     }, {
       "category": "Best Practices",
       "requirements": []
     }]
   }`;

export const createRiskPrompt = (formData) => 
  `Perform comprehensive risk analysis for construction project: ${formData.projectDescription}.
   Consider:
   - Project steps: ${formData.projectSteps}
   - User-identified risks: ${formData.identifiedRisks}
   - Common construction hazards
   - Site-specific factors
   - Environmental considerations
  
   Respond in strict JSON format: {
     "risks": [{
       "risk": "detailed risk description",
       "severity": "High/Medium/Low",
       "likelihood": "Probable/Possible/Rare",
       "mitigation": "detailed control measures",
       "legalReferences": ["list", "of", "relevant", "legislation"]
     }]
   }`;

export const createMethodPrompt = (formData) => 
  `Develop detailed method statement for: ${formData.projectSteps}.
   Include for each step:
   - Sequence of operations
   - Required equipment
   - Safety controls
   - Competency requirements
   - Inspection points
   - Emergency procedures
  
   Respond in strict JSON format: {
     "methodStatement": [{
       "step": "step description",
       "details": {
         "equipment": [],
         "controls": [],
         "competencies": [],
         "inspections": []
       }
     }]
   }`;