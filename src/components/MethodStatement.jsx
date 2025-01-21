import React from 'react';

const MethodStatement = ({ methodStatement }) => (
  <section className="mb-8">
    <h3 className="text-xl font-semibold mb-4">Method Statement</h3>
    <ol className="list-decimal pl-6 space-y-3">
      {methodStatement.map((step, index) => (
        <li key={index} className="text-gray-600">{step}</li>
      ))}
    </ol>
  </section>
);

export default MethodStatement;