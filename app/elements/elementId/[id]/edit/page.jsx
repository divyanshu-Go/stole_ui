"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { debounce } from "lodash";
import axios from "axios";
import ElementPreview from "@/app/elements/components/ElementPreview";
import CodeEditorComponent from "../../../components/CodeEditor";
import { useElement } from "@/hooks/useElement";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ElementPage() {
  const params = useParams();
  const router = useRouter();
  const {toast} = useToast();
  const elementId = params.id;
  const { element, setElement, loading, error } = useElement(elementId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  // Handle submit function
  const handleSubmit = async () => {
    if (!element) return;

    setIsSubmitting(true);
    try {
        console.log(element);
      await axios.put(`/api/element/${elementId}`, element);
      toast({
        title: "Success",
        description: "Element has been updated successfully.",
        duration: 3000,
      });
      // Optionally redirect back to the admin profile page
      router.push('/profile');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the element. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
        {/* Submit Button Section */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6"
          >
            {isSubmitting ? "Submitting..." : "Submit Changes"}
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="text-black grid grid-cols-2 gap-8">
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
    </div>
  );
}