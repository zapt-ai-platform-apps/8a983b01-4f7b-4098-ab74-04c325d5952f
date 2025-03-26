import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../../ui/components/Card';
import Button from '../../ui/components/Button';
import Skeleton from '../../ui/data/Skeleton';
import DataTable from '../../ui/data/DataTable';
import EmptyState from '../../ui/feedback/EmptyState';
import TextField from '../../ui/components/TextField';

const SavedReportsList = ({ reports, onSelect, loading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedReports = React.useMemo(() => {
    if (!reports) return [];
    
    const sortableReports = [...reports];
    
    sortableReports.sort((a, b) => {
      if (sortConfig.key === 'createdAt') {
        return sortConfig.direction === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return sortableReports;
  }, [reports, sortConfig]);

  const filteredReports = React.useMemo(() => {
    if (!searchTerm.trim()) return sortedReports;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return sortedReports.filter(report => 
      report.title.toLowerCase().includes(lowerSearchTerm)
    );
  }, [sortedReports, searchTerm]);

  if (loading) {
    return <Skeleton.Card />;
  }

  if (!reports || reports.length === 0) {
    return (
      <EmptyState
        title="No saved reports"
        description="You haven't created any safety reports yet."
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      />
    );
  }

  const columns = [
    {
      key: 'title',
      title: 'Report Title',
      sortable: true,
      render: (row) => (
        <div className="font-medium text-gray-800">{row.title}</div>
      )
    },
    {
      key: 'createdAt',
      title: 'Created',
      sortable: true,
      render: (row) => (
        <div className="text-gray-600">
          {new Date(row.createdAt).toLocaleDateString()} 
          <span className="text-gray-400 ml-2 text-xs">
            {new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      sortable: false,
      render: (row) => (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onSelect(row)}
        >
          View
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <TextField
        placeholder="Search reports..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      
      {filteredReports.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No reports found matching your search
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredReports}
          onRowClick={onSelect}
          emptyComponent={
            <EmptyState
              title="No reports found"
              description="Try changing your search term"
              variant="minimal"
            />
          }
        />
      )}
    </div>
  );
};

SavedReportsList.propTypes = {
  reports: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default SavedReportsList;