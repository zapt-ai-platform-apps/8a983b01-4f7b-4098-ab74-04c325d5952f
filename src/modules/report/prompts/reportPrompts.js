/**
 * Creates a prompt for generating legal requirements based on project details
 */
export const createLegislationPrompt = (formData) => 
  `Analyze UK construction health and safety requirements for: ${formData.projectDescription}.
   As this is for a construction project in the UK, include comprehensive legal compliance information:
   
   - Health and Safety at Work Act 1974 (HSWA) specific obligations
   - Construction (Design and Management) Regulations 2015 (CDM) requirements
   - Work at Height Regulations 2005 (if applicable)
   - Provision and Use of Work Equipment Regulations 1998 (PUWER)
   - Control of Substances Hazardous to Health Regulations 2002 (COSHH)
   - Relevant British Standards (BS) and European Norms (EN)
   - HSE guidance notes specific to this type of project
   - Industry best practices and standards
  
   Respond in strict JSON format with these exact fields:
   {
     "synopsis": "comprehensive legal overview with key obligations", 
     "obligations": [
       {
         "category": "Primary Legislation",
         "requirements": ["specific clause 1", "specific clause 2", ...]
       },
       {
         "category": "Secondary Regulations", 
         "requirements": ["specific regulation 1", "specific regulation 2", ...]
       },
       {
         "category": "Guidance Documents",
         "requirements": ["specific guidance 1", "specific guidance 2", ...]
       },
       {
         "category": "Best Practices",
         "requirements": ["specific practice 1", "specific practice 2", ...]
       }
     ]
   }`;

/**
 * Creates a prompt for generating risk assessment based on project details
 */
export const createRiskPrompt = (formData) => 
  `Perform comprehensive risk analysis for UK construction project: ${formData.projectDescription}.
   
   Project details:
   - Steps: ${formData.projectSteps}
   - User-identified risks: ${formData.identifiedRisks || "None specified"}
   - Organisation role: ${formData.organisationRole}
   
   Include analysis of:
   - All common construction hazards applicable to this project
   - Site-specific factors based on the description
   - Environmental considerations
   - Severity and likelihood ratings
   - Specific control measures for each risk
   - Relevant legislation references
  
   Respond in strict JSON format with these exact fields:
   {
     "risks": [
       {
         "risk": "detailed risk description",
         "severity": "High/Medium/Low",
         "likelihood": "Probable/Possible/Rare",
         "mitigation": "detailed control measures with step-by-step actions",
         "legalReferences": ["specific legislation 1", "specific legislation 2", ...]
       },
       {...}
     ]
   }`;

/**
 * Creates a prompt for generating method statement based on project details
 */
export const createMethodPrompt = (formData) => 
  `Develop detailed method statement for UK construction project: ${formData.projectSteps}.
   
   Project context:
   - Project description: ${formData.projectDescription}
   - Organisation role: ${formData.organisationRole}
   
   For each step provide:
   - Clear sequence of operations
   - Specific required equipment and tools
   - Detailed safety controls and PPE requirements
   - Competency and training requirements
   - Quality inspection points
   - Emergency procedures where relevant
  
   Respond in strict JSON format with these exact fields:
   {
     "methodStatement": [
       {
         "step": "detailed step description",
         "details": {
           "equipment": ["specific equipment 1", "specific equipment 2", ...],
           "controls": ["specific control 1", "specific control 2", ...],
           "competencies": ["specific competency 1", "specific competency 2", ...],
           "inspections": ["specific inspection 1", "specific inspection 2", ...]
         }
       },
       {...}
     ]
   }`;