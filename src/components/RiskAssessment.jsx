import React from 'react';

const RiskAssessment = ({ risks }) => (
  <section className="mb-8">
    <h3 className="text-xl font-semibold mb-4">Risk Assessment</h3>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-50">
          <th className="p-3 text-left border-b">Identified Risk</th>
          <th className="p-3 text-left border-b">Control Measures</th>
        </tr>
      </thead>
      <tbody>
        {risks.map((risk, index) => (
          <tr key={index} className="border-b hover:bg-gray-50">
            <td className="p-3">{risk.risk}</td>
            <td className="p-3">{risk.mitigation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default RiskAssessment;