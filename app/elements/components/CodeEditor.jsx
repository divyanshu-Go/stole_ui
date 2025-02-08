import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { CodeXml, PaintbrushVertical } from "lucide-react";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/themes/prism.css";

const CodeEditorComponent = ({ element, setElement }) => {
  const [activeSection, setActiveSection] = useState("html");

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-100 px-4 py-2 border-b font-medium flex justify-between">
        <button
          type="button"
          className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2
            ${activeSection === "html" ? "bg-white" : "hover:bg-gray-200"}`}
          onClick={() => setActiveSection("html")}
        >
          <CodeXml size={18} />
          HTML
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2
            ${activeSection === "css" ? "bg-white" : "hover:bg-gray-200"}`}
          onClick={() => setActiveSection("css")}
        >
          <PaintbrushVertical size={18} />
          CSS
        </button>
      </div>
      <div className={`${activeSection === "html" ? "block" : "hidden"}`}>
        <Editor
          value={element.htmlCode}
          onValueChange={(code) =>
            setElement({ ...element, htmlCode: code })
          }
          highlight={(code) => highlight(code, languages.markup, "markup")}
          padding={15}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "white",
            minHeight: "200px",
          }}
          className="min-h-[200px]"
        />
      </div>
      <div className={`${activeSection === "css" ? "block" : "hidden"}`}>
        <Editor
          value={element.cssCode}
          onValueChange={(code) =>
            setElement({ ...element, cssCode: code })
          }
          highlight={(code) => highlight(code, languages.css, "css")}
          padding={15}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "white",
            minHeight: "200px",
          }}
          className="min-h-[200px]"
        />
      </div>
    </div>
  );
};

export default CodeEditorComponent;