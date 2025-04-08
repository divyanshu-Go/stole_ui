import React, { useState } from "react";
import { CodeXml, PaintbrushVertical } from "lucide-react";


const CodeEditor = ({ element, setElement }) => {
  const [activeTab, setActiveTab] = useState("html");

  return (
    <div className="flex flex-col h-full border border-red-700 bg-zinc-900 rounded-lg overflow-hidden shadow-lg text-slate-200">
      {/* Tab Buttons */}
      <div className="h-10 flex border-b border-zinc-700 bg-zinc-800">
        <button
        type="button"
          className={`flex-1 py-2 text-center flex items-center justify-center gap-2 transition-colors ${
            activeTab === "html" ? "bg-zinc-700" : "hover:bg-zinc-800"
          }`}
          onClick={() => setActiveTab("html")}
        >
          <CodeXml size={16} />
          HTML
        </button>
        <button
        type="button"
          className={`flex-1 py-2 text-center flex items-center justify-center gap-2 transition-colors ${
            activeTab === "css" ? "bg-zinc-700" : "hover:bg-zinc-800"
          }`}
          onClick={() => setActiveTab("css")}
        >
          <PaintbrushVertical size={16} />
          CSS
        </button>
      </div>

      {/* Editor Area */}
      <div className=" flex-grow">
        {activeTab === "html" && (
          <textarea
            className="w-full h-full resize-none bg-zinc-800 text-slate-300 p-3 rounded-md outline-none border border-zinc-600 focus:ring-2 focus:ring-blue-500 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800"
            value={element.htmlCode}
            onChange={(e) => setElement({ ...element, htmlCode: e.target.value })}
            placeholder="Write your HTML code here..."
          />
        )}

        {activeTab === "css" && (
          <textarea
            className="w-full h-full resize-none bg-zinc-800 text-slate-300 p-3 rounded-md outline-none border border-zinc-600 focus:ring-2 focus:ring-blue-500 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800"
            value={element.cssCode}
            onChange={(e) => setElement({ ...element, cssCode: e.target.value })}
            placeholder="Write your CSS code here..."
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
