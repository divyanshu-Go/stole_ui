"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useElement } from "@/hooks/useElement";
import { useToast } from "@/hooks/use-toast";
import Button from "@/components/Button";
import EditorAndPreviewComponent from "@/components/EditorAndPreviewComponent";

export default function ElementPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const elementId = params.id;
  const { element, setElement, loading, error } = useElement(elementId);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Redirect back to profile page
      router.push("/profile");
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
    <div className="max-w-7xl mx-auto w-full text-slate-200 space-y-6">
        {/* Editor and Preview */}
        <EditorAndPreviewComponent element={element} setElement={setElement} />

        {/* Submit Button at the Bottom */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            isLoading={isSubmitting}
            text={`Submit Changes`}
            loadingText="Saving Changes"
          >
            Submit Changes
          </Button>
        </div>
    </div>
  );
}
