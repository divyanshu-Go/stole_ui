"use client"
import ElementPreview from "@/app/elements/components/ElementPreview";
import React, { useEffect, useMemo, useState } from "react";
import CodeEditor from "@/app/elements/components/CodeEditor";
import { debounce } from "lodash";

const EditorAndPreviewComponent = ({element, setElement}) => {

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

  return (
    <div className="flex sm:flex-row gap-2 sm:h-[500px] flex-col h-[650px] ">
      <CodeEditor element={element} setElement={setElement} />

      <ElementPreview element={previewElement} />
    </div>
  );
};

export default EditorAndPreviewComponent;
