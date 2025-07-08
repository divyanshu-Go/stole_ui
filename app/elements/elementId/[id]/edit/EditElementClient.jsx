"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Button from "@/components/Button";
import EditorAndPreviewComponent from "@/components/EditorAndPreviewComponent";

export default function EditElementClient({ initialElement, elementId }) {
  const [element, setElement] = useState(initialElement);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!element) return;

    setIsSubmitting(true);
    try {
      await axios.put(`/api/element/${elementId}`, element);
      toast({
        title: "Success",
        description: "Element has been updated successfully.",
        duration: 3000,
      });
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

  return (
    <div className="max-w-7xl mx-auto w-full text-slate-200 space-y-6">
      {/* Editor and Preview */}
      <EditorAndPreviewComponent element={element} setElement={setElement} />

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          text="Submit Changes"
          loadingText="Saving Changes"
        />
      </div>
    </div>
  );
}
