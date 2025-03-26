import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../../ui/data/DataTable';
import Button from '../../../ui/components/Button';

const severityBadgeClasses = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-amber-100 text-amber-800',
  Low: 'bg-green-100 text-green-800'
};

const likelihoodBadgeClasses = {
  Probable: 'bg-red-100 text-red-800',
  Possible: 'bg-amber-100 text-amber-800',
  Rare: 'bg-green-100 text-green-800'
};

const SeverityBadge = ({ severity }) => (
  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${severityBadgeClasses[severity]}`}>
    {severity}
  </span>
);

const LikelihoodBadge = ({ likelihood }) => (
  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${likelihoodBadgeClasses[likelihood]}`}>
    {likelihood}
  </span>
);

const RiskAssessment = ({ risks }) => {
  const [expandedRisks, setExpandedRisks] = React.useState({});

  const toggleRiskDetails = (riskId) => {
    setExpandedRisks(prev => ({
      ...prev,
      [riskId]: !prev[riskId]
    }));
  };

  const columns = [
    {
      key: 'risk',
      title: 'Risk Factor',
      render: (row) => (
        <div>
          <div className="font-medium">{row.risk}</div>
        </div>
      )
    },
    {
      key: 'severity',
      title: 'Severity',
      render: (row) => <SeverityBadge severity={row.severity} />
    },
    {
      key: 'likelihood',
      title: 'Likelihood',
      render: (row) => <LikelihoodBadge likelihood={row.likelihood} />
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <Button
          variant="text"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            toggleRiskDetails(row.risk);
          }}
        >
          {expandedRisks[row.risk] ? 'Hide Details' : 'Show Details'}
        </Button>
      )
    }
  ];

  // Transform risks data for the table
  const tableData = React.useMemo(() => {
    return risks?.map((risk, index) => ({
      id: index,
      ...risk
    })) || [];
  }, [risks]);

  return (
    <section className="mt-6">
      <DataTable
        columns={columns}
        data={tableData}
        onRowClick={(row) => toggleRiskDetails(row.risk)}
        rowClassName={(row) => expandedRisks[row.risk] ? 'bg-gray-50' : ''}
        expandedRows={Object.keys(expandedRisks).filter(risk => expandedRisks[risk])}
        renderExpanded={(row) => (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-1">Control Measures</h5>
                <p className="text-sm text-gray-700">{row.mitigation}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-1">Legal References</h5>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {row.legalReferences?.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  )) || 'None specified'}
                </ul>
              </div>
            </div>
          </div>
        )}
      />
    </section>
  );
};

RiskAssessment.propTypes = {
  risks: PropTypes.arrayOf(
    PropTypes.shape({
      risk: PropTypes.string.isRequired,
      severity: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
      likelihood: PropTypes.oneOf(['Probable', 'Possible', 'Rare']).isRequired,
      mitigation: PropTypes.string.isRequired,
      legalReferences: PropTypes.arrayOf(PropTypes.string)
    })
  )
};

SeverityBadge.propTypes = {
  severity: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired
};

LikelihoodBadge.propTypes = {
  likelihood: PropTypes.oneOf(['Probable', 'Possible', 'Rare']).isRequired
};

export default RiskAssessment;