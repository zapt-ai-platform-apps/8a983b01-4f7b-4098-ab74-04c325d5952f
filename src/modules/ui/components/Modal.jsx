import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

/**
 * Modal component for displaying content in a dialog
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  title = null,
  size = 'md', // sm, md, lg, xl, full
  centered = true,
  showCloseButton = true,
  showBackdrop = true,
  backdropClassName = '',
  contentClassName = '',
  closeOnEsc = true,
  closeOnBackdropClick = true,
  ...props
}) => {
  // Ref for the modal container
  const modalRef = useRef(null);
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-8 my-8',
  };
  
  // Focus trap and keyboard events
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      // Close on ESC
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
      
      // Trap focus inside modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Shift + Tab
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } 
        // Tab
        else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    // Focus the first focusable element
    const firstFocusable = modalRef.current.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEsc]);
  
  // Close button
  const CloseButton = () => (
    <button
      aria-label="Close"
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2 rounded-full"
      onClick={onClose}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
          clipRule="evenodd" 
        />
      </svg>
    </button>
  );
  
  // Modal content
  const modalContent = (
    <div className={`relative z-50 ${isOpen ? 'block' : 'hidden'}`}>
      {/* Backdrop */}
      {showBackdrop && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${backdropClassName}`}
          onClick={closeOnBackdropClick ? onClose : undefined}
          aria-hidden="true"
        />
      )}

      {/* Modal container */}
      <div 
        className={`fixed inset-0 z-10 overflow-y-auto p-4 ${centered ? 'flex items-center justify-center' : ''}`}
      >
        {/* Modal content */}
        <div 
          ref={modalRef}
          className={`
            relative bg-white rounded-lg shadow-xl transform transition-all
            ${sizeClasses[size]}
            ${contentClassName}
          `}
          {...props}
        >
          {showCloseButton && <CloseButton />}
          
          {title && (
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {title}
              </h3>
            </div>
          )}
          
          <div className={`p-6 ${title ? '' : 'pt-10'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
  
  // Create a portal to render the modal at the end of the document body
  return isOpen ? createPortal(modalContent, document.body) : null;
};

// Sub-components
const ModalActions = ({ children, className = '', ...props }) => (
  <div 
    className={`mt-6 flex items-center justify-end gap-3 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Attach sub-components
Modal.Actions = ModalActions;

// PropTypes
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  centered: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  showBackdrop: PropTypes.bool,
  backdropClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  closeOnEsc: PropTypes.bool,
  closeOnBackdropClick: PropTypes.bool,
};

ModalActions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Modal;