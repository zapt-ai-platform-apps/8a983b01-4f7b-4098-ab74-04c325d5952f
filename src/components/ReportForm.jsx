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

      <div className="space-y-6">
        <FormFields formData={formData} setFormData={setFormData} />
        <SubmitButton loading={loading} />
      </div>
    </form>
  );
};

export default ReportForm;