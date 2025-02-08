import React from 'react';

// This component displays the preview of a UI element
const ElementPreview = ({ element }) => {
  // If element data is not available, return a placeholder
  if (!element) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="animate-pulse">Loading preview...</div>
      </div>
    );
  }

  return (
    <iframe
      srcDoc={`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: calc(100vh - 40px);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              }
              ${element.cssCode}
            </style>
          </head>
          <body>
            ${element.htmlCode}
          </body>
        </html>
      `}
      className="w-full h-[500px] border-2"
      title="Component Preview"
      sandbox="allow-scripts"
    />
  );
};

export default ElementPreview;