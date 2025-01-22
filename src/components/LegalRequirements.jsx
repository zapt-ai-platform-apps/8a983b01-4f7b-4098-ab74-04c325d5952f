import React from 'react';

const LegalRequirements = ({ legislation }) => (
  <section className="mb-8">
    <h3 className="text-xl font-semibold mb-4">Legal & Regulatory Framework</h3>
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Key Legislation Synopsis</h4>
        <p className="text-gray-600">{legislation.synopsis}</p>
      </div>

      {legislation.obligations.map((category, index) => (
        <div key={index} className="border-l-4 border-blue-600 pl-4">
          <h4 className="font-medium text-gray-800 mb-2">{category.category}</h4>
          <ul className="list-disc pl-6 space-y-2">
            {category.requirements.map((req, reqIndex) => (
              <li key={reqIndex} className="text-gray-600">
                {req}
                {category.category === 'Primary Legislation' && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Legal Requirement
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default LegalRequirements;