"use client";

import React, { useState } from "react";
import {
  MousePointerClick,
  LayoutGrid,
  Loader2,
  ToggleRight,
  FormInput,
  Grid,
  MoreHorizontal,
} from "lucide-react";

import EditorAndPreviewComponent from "@/components/EditorAndPreviewComponent";
import Button from "@/components/Button";
import CategorySelector from "@/components/CategorySelector";
import { toast } from "sonner";

export default function ComponentSubmission() {
  const [element, setElement] = useState({
    htmlCode: '<button class="custom-button">\n  Click me\n</button>',
    cssCode:
      ".custom-button {\n  padding: 8px 16px;\n  background-color: #FFD700;\n  border: 2px solid black;\n  border-radius: 4px;\n  cursor: pointer;\n}",
    category: "Button",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      toast.success("Submitted Successfully")
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
      icon: <MousePointerClick className="w-6 h-6" />,
    },
    { value: "Card", label: "Card", icon: <LayoutGrid className="w-6 h-6" /> },
    {
      value: "Loader",
      label: "Loader",
      icon: <Loader2 className="w-6 h-6 animate-spin" />,
    },
    {
      value: "Switch",
      label: "Switch",
      icon: <ToggleRight className="w-6 h-6" />,
    },
    { value: "Form", label: "Form", icon: <FormInput className="w-6 h-6" /> },
    { value: "Pattern", label: "Pattern", icon: <Grid className="w-6 h-6" /> },
    {
      value: "Other",
      label: "Other",
      icon: <MoreHorizontal className="w-6 h-6" />,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  

  return (
    <div className="max-w-7xl mx-auto w-full text-slate-200">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Editor and Preview */}
        <EditorAndPreviewComponent element={element} setElement={setElement} />

        {/* Category Selector */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setElement={setElement}
        />


         {/* Submit Button */}
         <div className="flex flex-col-reverse items-center gap-4">
          <Button text="Submit Component" loadingText="Submitting..." isLoading={loading} type="submit" />
          {error && <p className="text-red-600 bg-red-300 p-2 w-full font-medium text-sm text-center rounded">{error}</p>}
        </div>

      </form>
    </div>
  );
}
