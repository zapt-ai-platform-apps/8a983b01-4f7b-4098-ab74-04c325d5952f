import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from './Skeleton';

/**
 * DataTable component for displaying tabular data
 */
const DataTable = ({
  columns,
  data,
  caption = null,
  isLoading = false,
  loadingRows = 5,
  emptyComponent = null,
  className = '',
  tableClassName = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName = '',
  cellClassName = '',
  sortable = true,
  pagination = null,
  selectable = false,
  onRowClick = null,
  actions = null,
  ...props
}) => {
  // State for sorting
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Reset selected rows when data changes
  useEffect(() => {
    setSelectedRows([]);
  }, [data]);
  
  // Handle sorting request
  const requestSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Get sorted data
  const getSortedData = () => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  // Handle row selection
  const handleRowSelect = (rowId, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    }
  };
  
  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = data.map(row => row.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };
  
  // Sorted data
  const sortedData = getSortedData();
  
  // Render loading skeleton
  if (isLoading) {
    return (
      <div className={className} {...props}>
        <Skeleton.Table rows={loadingRows} columns={columns.length} />
      </div>
    );
  }
  
  // Render empty state
  if (sortedData.length === 0 && emptyComponent) {
    return (
      <div className={className} {...props}>
        {emptyComponent}
      </div>
    );
  }
  
  return (
    <div className={`overflow-x-auto ${className}`} {...props}>
      <table className={`min-w-full divide-y divide-gray-200 ${tableClassName}`}>
        {caption && <caption className="sr-only">{caption}</caption>}
        
        <thead className={headerClassName}>
          <tr>
            {/* Checkbox column if selectable */}
            {selectable && (
              <th scope="col" className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={selectedRows.length > 0 && selectedRows.length === data.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
            )}
            
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`
                  px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${sortable && column.sortable !== false ? 'cursor-pointer hover:text-gray-700' : ''}
                  ${column.headerClassName || ''}
                `}
                onClick={() => column.sortable !== false ? requestSort(column.key) : null}
              >
                <div className="flex items-center">
                  {column.title}
                  
                  {/* Sort indicator */}
                  {sortable && column.sortable !== false && (
                    <span className="ml-2">
                      {sortConfig && sortConfig.key === column.key ? (
                        sortConfig.direction === 'asc' ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )
                      ) : (
                        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
            
            {/* Actions column */}
            {actions && (
              <th scope="col" className="relative px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        
        <tbody className={`bg-white divide-y divide-gray-200 ${bodyClassName}`}>
          {sortedData.map((row, rowIndex) => (
            <tr 
              key={row.id || rowIndex}
              className={`
                ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                ${rowClassName}
              `}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {/* Checkbox cell if selectable */}
              {selectable && (
                <td className="px-4 py-3 w-10" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={selectedRows.includes(row.id)}
                    onChange={(e) => handleRowSelect(row.id, e.target.checked)}
                  />
                </td>
              )}
              
              {columns.map((column) => (
                <td 
                  key={`${row.id || rowIndex}-${column.key}`}
                  className={`px-4 py-3 whitespace-nowrap text-sm ${cellClassName} ${column.cellClassName || ''}`}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              
              {/* Actions cell */}
              {actions && (
                <td 
                  className="px-4 py-3 whitespace-nowrap text-sm text-right" 
                  onClick={(e) => e.stopPropagation()}
                >
                  {typeof actions === 'function' ? actions(row) : actions}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      {pagination && (
        <div className="mt-4">
          {pagination}
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.node.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func,
      headerClassName: PropTypes.string,
      cellClassName: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  caption: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingRows: PropTypes.number,
  emptyComponent: PropTypes.node,
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  cellClassName: PropTypes.string,
  sortable: PropTypes.bool,
  pagination: PropTypes.node,
  selectable: PropTypes.bool,
  onRowClick: PropTypes.func,
  actions: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

export default DataTable;