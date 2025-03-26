import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../ui/components/Card';

const MethodStatement = ({ methodStatement }) => (
  <section className="mt-6">
    <ol className="space-y-5">
      {methodStatement?.map((step, index) => (
        <Card key={index} className="border-l-4 border-l-green-600" padding="normal">
          <Card.Header>
            <Card.Title className="flex items-center">
              <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                {index + 1}
              </span>
              <span>{step.step}</span>
            </Card.Title>
          </Card.Header>
          
          {step.details && (
            <Card.Content className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step.details.equipment?.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-1">Equipment</h5>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {step.details.equipment.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {step.details.controls?.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-1">Safety Controls</h5>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {step.details.controls.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {step.details.competencies?.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-1">Required Competencies</h5>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {step.details.competencies.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {step.details.inspections?.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-1">Inspection Points</h5>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {step.details.inspections.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card.Content>
          )}
        </Card>
      ))}
    </ol>
  </section>
);

MethodStatement.propTypes = {
  methodStatement: PropTypes.arrayOf(
    PropTypes.shape({
      step: PropTypes.string.isRequired,
      details: PropTypes.shape({
        equipment: PropTypes.arrayOf(PropTypes.string),
        controls: PropTypes.arrayOf(PropTypes.string),
        competencies: PropTypes.arrayOf(PropTypes.string),
        inspections: PropTypes.arrayOf(PropTypes.string)
      })
    })
  )
};

export default MethodStatement;