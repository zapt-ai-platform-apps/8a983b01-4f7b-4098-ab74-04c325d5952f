import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../ui/components/TextField';

const FormField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = '',
  isTextArea = false,
  type = 'text',
  error = null,
  helperText = null,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      multiline={isTextArea}
      rows={isTextArea ? 5 : undefined}
      type={type}
      error={error}
      helperText={helperText}
    />
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  isTextArea: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
};

export default FormField;