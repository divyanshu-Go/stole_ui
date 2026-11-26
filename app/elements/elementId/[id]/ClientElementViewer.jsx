"use client";

import { useState } from "react";
import EditorAndPreviewComponent from "@/components/EditorAndPreviewComponent";
import LikeSaveActions from "@/components/LikeSaveActions";
import CommentsSection from "@/components/CommentsSection";

export default function ClientElementPage({ element }) {
  const [currentElement, setElement] = useState(element);

  return (
    <div className="max-w-7xl mx-auto w-full text-slate-200 flex flex-col gap-6 ">
      <EditorAndPreviewComponent element={currentElement} setElement={setElement} />
      <LikeSaveActions element={currentElement} />
      <CommentsSection elementId={currentElement._id} />
    </div>
  );
}
