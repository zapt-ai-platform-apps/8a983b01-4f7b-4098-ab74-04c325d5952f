import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for containing content
 */
const Card = ({
  children,
  className = '',
  variant = 'default', // default, outlined, elevated
  onClick = null,
  padding = 'normal', // none, small, normal, large
  ...props
}) => {
  // Base classes
  const baseClasses = 'bg-white rounded-lg overflow-hidden transition-all';
  
  // Variant classes
  const variantClasses = {
    default: 'border border-gray-200',
    outlined: 'border-2 border-gray-300',
    elevated: 'shadow-lg border border-gray-100',
  };
  
  // Padding classes
  const paddingClasses = {
    none: '',
    small: 'p-3',
    normal: 'p-5',
    large: 'p-8',
  };
  
  // Interactive classes (for clickable cards)
  const interactiveClasses = onClick ? 'cursor-pointer hover:shadow-md active:shadow-inner' : '';
  
  // Combine all classes
  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${interactiveClasses}
    ${className}
  `;
  
  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Sub-components for card parts
const CardHeader = ({ children, className = '', ...props }) => (
  <div 
    className={`mb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 
    className={`text-xl font-semibold text-gray-800 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardSubtitle = ({ children, className = '', ...props }) => (
  <p 
    className={`text-sm text-gray-500 mt-1 ${className}`}
    {...props}
  >
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div 
    className={`${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div 
    className={`mt-4 pt-4 border-t border-gray-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardActions = ({ children, className = '', ...props }) => (
  <div 
    className={`flex items-center justify-end gap-3 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Actions = CardActions;

// PropTypes
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
  onClick: PropTypes.func,
  padding: PropTypes.oneOf(['none', 'small', 'normal', 'large']),
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardSubtitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardActions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;