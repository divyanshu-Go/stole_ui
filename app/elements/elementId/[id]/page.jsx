import React from "react";
import EditorAndPreviewComponent from "@/components/EditorAndPreviewComponent";
import CommentsSection from "@/components/CommentsSection";
import LikeSaveActions from "@/components/LikeSaveActions";
import {getElementById} from "@/lib/api"


export default async function ElementPage({ params }) {
  const elementId = params.id;

  let element;

  try {
    element = await getElementById(elementId);
  } catch (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">Failed to load element: {error.message}</div>
      </div>
    );
  }

  if (!element) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">Element not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full text-slate-200 flex flex-col gap-6">
      <EditorAndPreviewComponent element={element} />
      <LikeSaveActions element={element} />
      <CommentsSection elementId={element._id} />
    </div>
  );
}
