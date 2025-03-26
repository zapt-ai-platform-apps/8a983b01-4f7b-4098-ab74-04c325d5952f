import React from 'react';
import PropTypes from 'prop-types';
import { ToastProvider } from './ToastProvider';
import { theme, getCssVariables } from '../../core/theme';

/**
 * UIProvider component that combines various UI providers
 * and applies global theme variables
 */
export const UIProvider = ({ children, toastPosition = 'bottom-right' }) => {
  // Apply theme CSS variables to the root element
  const cssVars = getCssVariables();
  
  return (
    <div style={cssVars}>
      <ToastProvider position={toastPosition}>
        {children}
      </ToastProvider>
    </div>
  );
};

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
  toastPosition: PropTypes.oneOf([
    'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
  ]),
};

export default UIProvider;