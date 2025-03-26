export const appearance = {
  theme: 'default',
  variables: {
    default: {
      colors: {
        brand: '#4f46e5',
        brandAccent: '#4338ca',
        brandButtonText: 'white',
        inputText: '#1f2937',
        inputLabelText: '#374151',
        messageText: '#6b7280',
        anchorTextColor: '#4b5563',
      },
      space: {
        buttonPadding: '0.75rem 1.5rem',
        inputPadding: '0.75rem 1rem',
      },
      radii: {
        borderRadiusButton: '0.5rem',
        buttonBorderRadius: '0.5rem',
        inputBorderRadius: '0.5rem',
      },
      fonts: {
        bodyFontFamily: 'Inter, sans-serif',
        buttonFontFamily: 'Inter, sans-serif',
        inputFontFamily: 'Inter, sans-serif',
        labelFontFamily: 'Inter, sans-serif',
      },
      fontSizes: {
        baseBodySize: '16px',
        baseInputSize: '16px',
        baseLabelSize: '14px',
        baseButtonSize: '16px',
      }
    },
  },
  style: {
    button: {
      borderWidth: '1px',
      fontWeight: '500',
      transition: 'all 150ms ease',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    anchor: {
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 150ms ease',
    },
    label: {
      fontWeight: '500',
      marginBottom: '0.5rem',
    },
    input: {
      borderWidth: '1px',
      transition: 'border-color 150ms ease, box-shadow 150ms ease',
    },
    message: {
      padding: '0.75rem',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
    },
    loader: {
      borderWidth: '2px',
    },
  },
  className: {
    button: 'transform hover:scale-[1.01] active:scale-[0.99]',
    input: 'focus:ring-1 focus:ring-primary-500 focus:border-primary-500',
    message: 'text-sm',
    anchor: 'hover:opacity-80',
  },
};