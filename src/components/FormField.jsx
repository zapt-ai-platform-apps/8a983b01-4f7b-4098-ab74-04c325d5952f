import React from 'react';

const FormField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = '',
  isTextArea = false,
  type = 'text'
}) => {
  const InputComponent = isTextArea ? 'textarea' : 'input';

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <InputComponent
        type={type}
        required={required}
        className="w-full px-3 py-2 border rounded-md box-border"
        style={isTextArea ? { height: '8rem' } : {}}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FormField;