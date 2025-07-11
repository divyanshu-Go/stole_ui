"use client";

import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import EditorAndPreviewComponent from "@/components/EditorAndPreviewComponent";
import Button from "@/components/Button";
import CategorySelector from "@/components/CategorySelector";
import { toast } from "sonner";

export default function ComponentSubmission({ categories }) {
  const [element, setElement] = useState({
    htmlCode: '<button class="custom-button">\n  Click me\n</button>',
    cssCode:
      ".custom-button {\n  padding: 8px 16px;\n  background-color: #FFD700;\n  border: 2px solid black;\n  border-radius: 4px;\n  cursor: pointer;\n}",
    category: categories[0]?.name || "",
    zoom:1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState({
    name: categories[0]?.name,
    icon: categories[0]?.icon || "Square", 
  });

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

      if (!response.ok) throw new Error("Failed to submit component");

      toast.success("Submitted Successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full text-slate-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <EditorAndPreviewComponent element={element} setElement={setElement} />

        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setElement={setElement}
        />

        <div className="flex flex-col-reverse items-center gap-4">
          <Button
            text="Submit Component"
            loadingText="Submitting..."
            isLoading={loading}
            type="submit"
          />
          {error && (
            <p className="text-red-600 bg-red-300 p-2 w-full font-medium text-sm text-center rounded">
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
