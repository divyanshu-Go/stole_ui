"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useElement } from "@/hooks/useElement";
import EditorAndPreviewComponent from "@/components/EditorAndPreviewComponent";
import LoadingScreen from "@/components/LoadingScreen";
import CommentsSection from "@/components/CommentsSection";
import { useProfile } from "@/hooks/useProfile";
import LikeSaveActions from "@/components/LikeSaveActions";

export default function ElementPage() {
  const params = useParams();
  const elementId = params.id;
  const { element, setElement, loading, error } = useElement(elementId);
  const { user } = useProfile();



  if (loading) {
    return <LoadingScreen message="Loading elements..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full text-slate-200 flex flex-col gap-6">
      {/* Editor and Preview Component */}
      <EditorAndPreviewComponent element={element} setElement={setElement} />

      <LikeSaveActions element={element} />
      
      <CommentsSection elementId={element._id} user={user} />
    </div>
  );
}
