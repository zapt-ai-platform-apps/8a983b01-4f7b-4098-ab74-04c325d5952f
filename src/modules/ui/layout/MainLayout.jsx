import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';

/**
 * MainLayout component for consistent page layout
 */
const MainLayout = ({
  children,
  header,
  footer,
  sidebar = null,
  maxWidth = 'lg',
  padding = true,
  className = '',
  contentClassName = '',
  hasSidebar = false,
  ...props
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${className}`} {...props}>
      {/* Header */}
      {header && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <Container maxWidth={maxWidth} padding={padding}>
            {header}
          </Container>
        </header>
      )}
      
      {/* Main content with optional sidebar */}
      <main className="flex-grow">
        {hasSidebar ? (
          <div className="flex h-full">
            {/* Sidebar */}
            {sidebar && (
              <aside className="w-64 border-r border-gray-200 bg-white h-full flex-shrink-0">
                {sidebar}
              </aside>
            )}
            
            {/* Main content */}
            <div className={`flex-grow ${contentClassName}`}>
              <Container maxWidth={maxWidth} padding={padding}>
                {children}
              </Container>
            </div>
          </div>
        ) : (
          <Container maxWidth={maxWidth} padding={padding} className={`py-6 ${contentClassName}`}>
            {children}
          </Container>
        )}
      </main>
      
      {/* Footer */}
      {footer && (
        <footer className="bg-white border-t border-gray-200">
          <Container maxWidth={maxWidth} padding={padding}>
            {footer}
          </Container>
        </footer>
      )}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  sidebar: PropTypes.node,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full']),
  padding: PropTypes.bool,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  hasSidebar: PropTypes.bool,
};

export default MainLayout;