"use client";
import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import {
  CodeXml,
  PaintbrushVertical,
  Eye,
  MousePointerClick,
  LayoutGrid,
  Loader2,
  ToggleRight,
  FormInput,
  Grid,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/themes/prism.css";

export default function ComponentSubmission() {
  // Initial state for form data
  const [formData, setFormData] = useState({
    htmlCode: '<button class="custom-button">\n  Click me\n</button>',
    cssCode:
      ".custom-button {\n  padding: 8px 16px;\n  background-color: #FFD700;\n  border: 2px solid black;\n  border-radius: 4px;\n  cursor: pointer;\n}",
    category: "Button",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewKey, setPreviewKey] = useState(0);
  const [activeSection, setActiveSection] = useState("html");

  // Category dropdown state
  const categories = [
    {
      value: "Button",
      label: "Button",
      icon: <MousePointerClick className="w-4 h-4 mr-2" />,
    },
    {
      value: "Card",
      label: "Card",
      icon: <LayoutGrid className="w-4 h-4 mr-2" />,
    },
    {
      value: "Loader",
      label: "Loader",
      icon: <Loader2 className="w-4 h-4 mr-2 animate-spin" />,
    },
    {
      value: "Switch",
      label: "Switch",
      icon: <ToggleRight className="w-4 h-4 mr-2" />,
    },
    {
      value: "Form",
      label: "Form",
      icon: <FormInput className="w-4 h-4 mr-2" />,
    },
    {
      value: "Pattern",
      label: "Pattern",
      icon: <Grid className="w-4 h-4 mr-2" />,
    },
    {
      value: "Other",
      label: "Other",
      icon: <MoreHorizontal className="w-4 h-4 mr-2" />,
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpen, setIsOpen] = useState(false);

  // Create the complete HTML document for preview
  const createPreviewDocument = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Reset default styles */
            body {
              margin: 0;
              padding: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: calc(100vh - 40px);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
            /* User's CSS */
            ${formData.cssCode}
          </style>
        </head>
        <body>
          ${formData.htmlCode}
        </body>
      </html>
    `;
  };

  // Update the preview whenever code changes
  useEffect(() => {
    setPreviewKey((prev) => prev + 1);
  }, [formData.htmlCode, formData.cssCode]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/element", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category: selectedCategory.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit component");
      }

      alert("Component submitted successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Code Editors Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* HTML/CSS Editors */}
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-100 px-4 py-2 border-b font-medium flex justify-between">
              <button
                type="button"
                className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2 ${
                  activeSection === "html" ? "bg-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveSection("html")}
              >
                <CodeXml size={18} />
                HTML
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2 ${
                  activeSection === "css" ? "bg-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveSection("css")}
              >
                <PaintbrushVertical size={18} />
                CSS
              </button>
            </div>
            <div className={activeSection === "html" ? "block" : "hidden"}>
              <Editor
                value={formData.htmlCode}
                onValueChange={(code) =>
                  setFormData({ ...formData, htmlCode: code })
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
            <div className={activeSection === "css" ? "block" : "hidden"}>
              <Editor
                value={formData.cssCode}
                onValueChange={(code) =>
                  setFormData({ ...formData, cssCode: code })
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

          {/* Preview Section */}
          <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col">
            <div className="bg-gray-100 px-4 py-2 border-b font-medium flex justify-between">
              <button
                type="button"
                className="px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2 bg-white"
              >
                <Eye size={18} />
                PREVIEW
              </button>
            </div>
            <iframe
              key={previewKey}
              srcDoc={createPreviewDocument()}
              className="w-full h-[500px] border-2"
              title="Component Preview"
              sandbox="allow-scripts"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <button
            type="button" // Prevent form submission
            id="category"
            className="w-full flex items-center justify-between border p-2 rounded focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center">
              {selectedCategory.icon} {selectedCategory.label}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {isOpen && (
            <div className="absolute bottom-full mb-1 w-full bg-white border rounded shadow-lg z-10">
              {categories.map((category) => (
                <div
                  key={category.value}
                  role="option"
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(false);
                  }}
                >
                  {category.icon} {category.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Submitting..." : "Submit Component"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
}
