// CodeEditor.jsx
import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange, className }) => {
 return (
   <div className={className}>
     <Editor
     className='border border-black'
       height="100%"
       defaultLanguage={language}
       value={value}
       onChange={onChange}
       options={{
         minimap: { enabled: false },
         scrollBeyondLastLine: false,
       }}
     />
   </div>
 );
};

export default CodeEditor;