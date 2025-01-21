import React from 'react';

const LegalRequirements = ({ legislation }) => (
  <section className="mb-8">
    <h3 className="text-xl font-semibold mb-4">Legal Requirements</h3>
    <div className="space-y-4">
      <p className="text-gray-600">{legislation.synopsis}</p>
      <ul className="list-disc pl-6">
        {legislation.obligations.map((item, index) => (
          <li key={index} className="text-gray-600 mb-2">{item}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default LegalRequirements;