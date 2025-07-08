"use client"
import React from "react";
import { Eye } from "lucide-react";

const ElementPreview = ({ element }) => {
  return (
    <div className="border-zinc-500/50 border-[3px] flex flex-col h-full w-full rounded-lg overflow-hidden text-slate-300">
      {/* Header */}
      <div className="bg-stone-800 px-4 pt-2 font-bold tracking-wide flex">
        <button
          type="button"
          className="px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2 bg-zinc-300 text-slate-900"
        >
          <Eye size={18} />
          PREVIEW
        </button>
      </div>

      {/* Preview Section */}
      <div className="h-full flex items-center justify-center">
        {element ? (
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
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      min-height: calc(100vh - 40px);
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                      background-color: #d4d4d8;
                      color: white;
                    }
                    ${element.cssCode}
                  </style>
                </head>
                <body>
                  ${element.htmlCode}
                </body>
              </html>
            `}
            className="w-full h-full blue"
            title="Component Preview"
            sandbox="allow-scripts"
          />
        ) : (
          <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="animate-pulse">Loading preview...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElementPreview;
