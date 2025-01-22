import React from 'react';

const MethodStatement = ({ methodStatement }) => (
  <section className="mb-8">
    <h3 className="text-xl font-semibold mb-4">Method Statement</h3>
    <ol className="list-decimal pl-6 space-y-3">
      {methodStatement?.map((step, index) => (
        <li key={index} className="text-gray-600">
          <strong className="block">{step.step}</strong>
          {step.details && (
            <div className="ml-4 mt-2 text-sm">
              {step.details.equipment?.length > 0 && (
                <p>Equipment: {step.details.equipment.join(', ')}</p>
              )}
              {step.details.controls?.length > 0 && (
                <p>Safety Controls: {step.details.controls.join(', ')}</p>
              )}
              {step.details.competencies?.length > 0 && (
                <p>Required Competencies: {step.details.competencies.join(', ')}</p>
              )}
              {step.details.inspections?.length > 0 && (
                <p>Inspection Points: {step.details.inspections.join(', ')}</p>
              )}
            </div>
          )}
        </li>
      ))}
    </ol>
  </section>
);

export default MethodStatement;