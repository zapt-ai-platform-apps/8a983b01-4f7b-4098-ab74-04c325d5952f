import React from 'react';

export const ErrorMessage = ({ error }) => {
  return (
    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
      {error}
      <br />
      Please check your input and try again. If the problem persists, contact support.
    </div>
  );
};