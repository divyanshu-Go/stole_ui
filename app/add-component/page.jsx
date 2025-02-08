"use client"

import React, { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash"; // Import lodash debounce
import {
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
import ElementPreview from "../elements/components/ElementPreview";
import CodeEditor from "../elements/components/CodeEditor";

export default function ComponentSubmission() {
  const [element, setElement] = useState({
    htmlCode: '<button class="custom-button">\n  Click me\n</button>',
    cssCode: ".custom-button {\n  padding: 8px 16px;\n  background-color: #FFD700;\n  border: 2px solid black;\n  border-radius: 4px;\n  cursor: pointer;\n}",
    category: "Button",
  });

  // Create a separate state for the preview
  const [previewElement, setPreviewElement] = useState(element);

  // Create a debounced update function
  const debouncedSetPreview = useMemo(
    () => debounce((newElement) => setPreviewElement(newElement), 500),
    []
  );

  // Update preview with debounce
  useEffect(() => {
    debouncedSetPreview(element);
    
    // Cleanup
    return () => debouncedSetPreview.cancel();
  }, [element, debouncedSetPreview]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/element", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(element),
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <CodeEditor element={element} setElement={setElement} />

          <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col items-center justify-center bg-white">
            <div className="bg-gray-100 px-4 py-2 w-full border-b font-medium flex justify-between">
              <button
                type="button"
                className="px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2 bg-white"
              >
                <Eye size={18} />
                PREVIEW
              </button>
            </div>
            <ElementPreview element={previewElement} />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <button
            type="button"
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
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(category);
                    setElement({ ...element, category: category.value });
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
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Submitting..." : "Submit Component"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
}