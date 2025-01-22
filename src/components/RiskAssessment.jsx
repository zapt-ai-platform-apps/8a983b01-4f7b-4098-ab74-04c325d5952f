import React from 'react';

const severityColors = {
  High: 'red-600',
  Medium: 'orange-500',
  Low: 'green-600'
};

const RiskAssessment = ({ risks }) => (
  <section className="mb-8">
    <h3 className="text-xl font-semibold mb-4">Comprehensive Risk Analysis</h3>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 text-left border-b">Identified Risk</th>
            <th className="p-3 text-left border-b">Severity</th>
            <th className="p-3 text-left border-b">Likelihood</th>
            <th className="p-3 text-left border-b">Control Measures</th>
            <th className="p-3 text-left border-b">Legal References</th>
          </tr>
        </thead>
        <tbody>
          {risks?.map((risk, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">{risk.risk}</td>
              <td className={`p-3 text-${severityColors[risk.severity]}`}>
                {risk.severity}
              </td>
              <td className="p-3">{risk.likelihood}</td>
              <td className="p-3">{risk.mitigation}</td>
              <td className="p-3 text-sm">
                <ul className="list-disc pl-4">
                  {risk.legalReferences?.map((ref, refIndex) => (
                    <li key={refIndex}>{ref}</li>
                  )) ?? []}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default RiskAssessment;