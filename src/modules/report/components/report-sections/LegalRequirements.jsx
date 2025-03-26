import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../ui/components/Card';

const LegalRequirements = ({ legislation }) => (
  <section className="mt-6 space-y-6">
    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
      <h4 className="font-medium text-blue-800 mb-3">Legal Framework Summary</h4>
      <p className="text-gray-700">{legislation.synopsis}</p>
    </div>

    {legislation.obligations.map((category, index) => (
      <Card key={index} className="border-l-4 border-l-blue-600" padding="normal">
        <Card.Header>
          <Card.Title className="text-lg text-gray-800">{category.category}</Card.Title>
        </Card.Header>
        <Card.Content>
          <ul className="list-disc pl-5 space-y-2">
            {category.requirements.map((req, reqIndex) => (
              <li key={reqIndex} className="text-gray-700">
                {req}
                {category.category === 'Primary Legislation' && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Legal Requirement
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Card.Content>
      </Card>
    ))}
  </section>
);

LegalRequirements.propTypes = {
  legislation: PropTypes.shape({
    synopsis: PropTypes.string.isRequired,
    obligations: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        requirements: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    ).isRequired
  }).isRequired
};

export default LegalRequirements;