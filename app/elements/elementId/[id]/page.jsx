"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useElement } from "@/hooks/useElement";
import EditorAndPreviewComponent from "@/components/EditorAndPreviewComponent";

export default function ElementPage() {
  const params = useParams();
  const elementId = params.id;
  const { element, setElement, loading, error } = useElement(elementId);

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
        {/* Editor and Preview Component */}
        <EditorAndPreviewComponent element={element} setElement={setElement} />
    </div>
  );
}
