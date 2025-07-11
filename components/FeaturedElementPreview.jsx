// components/ElementPreview.jsx
import { Code } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ElementPreview({ element, index }) {
  const { _id, htmlCode, cssCode, zoom } = element || {};

  if (!element) {
    return (
      <div className="w-full min-h-[400px] bg-[#1a1a1a] rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading preview...</div>
      </div>
    );
  }
 

  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #0f0f0f;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }

          .zoom-wrapper {
            transform: scale(${zoom});
            transform-origin: center center;
          }

          ${cssCode}
        </style>
      </head>
      <body>
        <div class="zoom-wrapper">
          ${htmlCode}
        </div>
      </body>
    </html>
  `;

  return (
    <div
      className="bg-[#1a1a1a] scale-[0.70] sm:scale-[0.80] md:scale-90  box-shadow  -rotate-0 hover:-rotate-3 hover:scale-105 rounded shadow-lg border-2 border-stone-800 flex justify-center transition-transform  duration-200 ease-in-out"
 
    >
      <div
        className="bg-[#0f0f0f] rounded-lg overflow-hidden text-shadow"
        style={{
          width: "300px",
          height: "200px",
        }}
      >
        <iframe
          srcDoc={srcDoc}
          title="Component Preview"
          sandbox="allow-scripts"
          className="w-full h-full border-none"
          scrolling="no"
        />

        <Link
          href={`/elements/elementId/${_id}`}
          className="absolute bottom-2 right-2 flex items-center gap-1 bg-zinc-900
           hover:bg-zinc-950 hover:border-violet-100 text-zinc-200 px-3 py-1.5 rounded-md 
           sm:text-xs font-medium transition-colors duration-200 border-2 border-zinc-800
           text-xs"
        >
          <Code size={16} />
          <span>Get code</span>
        </Link>


      </div>
    </div>
  );
}