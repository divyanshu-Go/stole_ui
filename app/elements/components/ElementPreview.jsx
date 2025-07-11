"use client";
import React, { useState } from "react";
import { Eye, Plus, Minus } from "lucide-react";

const ElementPreview = ({ element, setElement }) => {
  const zoom = parseFloat(element.zoom) || 1;


const handleZoomIn = () => {
  const newZoom = Math.min(parseFloat(element.zoom) + 0.05, 2);
  // Store the zoom value as a number
  setElement((prev) => ({ ...prev, zoom: newZoom }));
};

const handleZoomOut = () => {
  const newZoom = Math.max(parseFloat(element.zoom) - 0.05, 0.2);
  // Store the zoom value as a number
  setElement((prev) => ({ ...prev, zoom: newZoom }));
};



  const srcDoc = `
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

          .zoom-wrapper {
            transform: scale(${zoom});
            transform-origin: center center;
          }

          ${element.cssCode}
        </style>
      </head>
      <body>
        <div class="zoom-wrapper">
          ${element.htmlCode}
        </div>
      </body>
    </html>
  `;

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
      <div className="h-full flex flex-col items-center bg-[#d4d4d8] justify-center">
        {element ? (
          <iframe
            srcDoc={srcDoc}
            className="w-full h-full border-b border-zinc-500"
            title="Component Preview"
            sandbox="allow-scripts"
            scrolling="no"
          />
        ) : (
          <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="animate-pulse">Loading preview...</div>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="mt-2 flex items-center gap-3 text-black font-medium pb-0.5">
          <button
            type="button" // ✅ prevent form submission
            onClick={handleZoomOut}
            className="px-2 py-1 rounded bg-zinc-300 text-black hover:bg-zinc-400 transition"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-[40px] text-center">{(zoom * 100).toFixed(0)}%</span>

          <button
            type="button" // ✅ prevent form submission
            onClick={handleZoomIn}
            className="px-2 py-1 rounded bg-zinc-300 text-black hover:bg-zinc-400 transition"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementPreview;
