"use client"
import ElementPreview from "@/app/elements/components/ElementPreview";
import React, { useEffect, useMemo, useState } from "react";
import CodeEditor from "@/app/elements/components/CodeEditor";
import { debounce } from "lodash";

const EditorAndPreviewComponent = ({element, setElement}) => {


  return (
   
    <div className="flex sm:flex-row gap-2 sm:h-[500px] flex-col h-[650px] ">
      
      <CodeEditor element={element} setElement={setElement} />

      <ElementPreview element={element} setElement={setElement}/>
    </div>
  );
};

export default EditorAndPreviewComponent;
