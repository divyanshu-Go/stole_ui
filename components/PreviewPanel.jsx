// PreviewPanel.jsx
import React from 'react';

const PreviewPanel = ({ htmlCode, cssCode }) => {
  return (
    <div className="h-[50vh] overflow-auto p-4 border rounded-md">
      <style>{cssCode}</style>
      <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
    </div>
  );
};

export default PreviewPanel;