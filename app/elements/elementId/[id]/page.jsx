"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Eye } from "lucide-react";
import { debounce } from "lodash";
import ElementPreview from "@/app/elements/components/ElementPreview";
import CodeEditorComponent from "../../components/CodeEditor";
import { useElement } from "@/hooks/useElement";

export default function ElementPage() {
  const params = useParams();
  const elementId = params.id;
  const { element, setElement, loading, error } = useElement(elementId);
  
  // Create a separate state for the preview
  const [previewElement, setPreviewElement] = useState(element);

  // Create a debounced update function
  const debouncedSetPreview = useMemo(
    () => debounce((newElement) => {
      if (newElement) {
        setPreviewElement(newElement);
      }
    }, 500),
    []
  );

  // Update preview with debounce
  useEffect(() => {
    debouncedSetPreview(element);
    
    // Cleanup
    return () => debouncedSetPreview.cancel();
  }, [element, debouncedSetPreview]);

  // Set initial preview state when element is first loaded
  useEffect(() => {
    if (element) {
      setPreviewElement(element);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="animate-pulse">Loading element...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="text-black container mx-auto px-4 py-8 grid grid-cols-2 gap-8">
        {/* Preview Section */}
        <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col items-center justify-center">
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

        {/* Code Editor Section */}
        <CodeEditorComponent element={element} setElement={setElement} />
      </div>
    </div>
  );
}