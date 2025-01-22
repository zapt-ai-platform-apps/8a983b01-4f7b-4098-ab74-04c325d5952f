import React, { useState } from 'react';
import { initialFormData } from '../utils/formConfig';
import { ErrorMessage } from './ErrorMessage';
import { SubmitButton } from './SubmitButton';
import FormFields from './FormFields';

const ReportForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      {error && <ErrorMessage error={error} />}
      {loading && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">
          Generating your report... This may take up to 30 seconds
        </div>
      )}

      <div className="space-y-6">
        <FormFields formData={formData} setFormData={setFormData} />
        <SubmitButton loading={loading} />
      </div>
    </form>
  );
};

export default ReportForm;