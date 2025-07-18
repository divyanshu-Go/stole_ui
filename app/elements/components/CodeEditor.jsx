"use client"
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { Check, ClipboardCopy, CodeXml, Copy, PaintbrushVertical } from "lucide-react";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/themes/prism.css";

const CodeEditorComponent = ({ element, setElement }) => {
  const [activeSection, setActiveSection] = useState("html");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeToCopy = activeSection === "html" ? element.htmlCode : element.cssCode;
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };


  return (
    <div className="border-zinc-500/50 border-[3px] flex flex-col h-full w-full rounded-lg overflow-hidden text-slate-300 relative">
      {/* Header Buttons */}
      <div className="bg-stone-800 px-4 pt-2 font-bold tracking-wide flex justify-between ">
        <button
          type="button"
          className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2 
            ${activeSection === "html" ? "bg-zinc-300 text-slate-900" : "hover:bg-zinc-950"}`}
          onClick={() => setActiveSection("html")}
        >
          <CodeXml size={18} />
          HTML
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2 
            ${activeSection === "css" ? "bg-zinc-300 text-slate-900" : "hover:bg-zinc-950"}`}
          onClick={() => setActiveSection("css")}
        >
          <PaintbrushVertical size={18} />
          CSS
        </button>

        <button
          type="button"
          onClick={handleCopy}
          title="Copy Code"
          className="absolute z-10 right-2 top-14 p-1.5 rounded-md border border-gray-400 
             hover:bg-gray-100 transition"
        >
          {copied ? (
            <Check size={18} className="text-green-500" />
          ) : (
            <Copy size={18} className="text-zinc-700" />
          )}
        </button>


      </div>

      {/* HTML Editor */}
      <div className={`${activeSection === "html" ? "block" : "hidden"} flex-grow overflow-y-auto  `}>
        <Editor
          value={element.htmlCode}
          onValueChange={(code) => setElement({ ...element, htmlCode: code })}
          highlight={(code) => highlight(code, languages.markup, "markup")}
          padding={15}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            minHeight: "100%",
          }}
          className="min-h-[200px] rounded-b-lg bg-zinc-300 text-zinc-800 "
        />
      </div>

      {/* CSS Editor */}
      <div className={`${activeSection === "css" ? "block" : "hidden"} flex-grow overflow-y-auto`}>
        <Editor
          value={element.cssCode}
          onValueChange={(code) => setElement({ ...element, cssCode: code })}
          highlight={(code) => highlight(code, languages.css, "css")}
          padding={15}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            minHeight: "100%",
          }}
          className="min-h-[200px] rounded-b-lg bg-zinc-300 text-zinc-800 "
        />
      </div>
    </div>
  );
};

export default CodeEditorComponent;
