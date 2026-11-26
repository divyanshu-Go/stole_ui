import React from "react";
import { notFound } from "next/navigation";
import EditElementClient from "./EditElementClient";
import { getElementByIdFromDB } from "@/lib/server/element";

export const dynamic = "force-dynamic";

export default async function EditElementPage({ params }) {
  const { id: elementId } = await params;
  const element = await getElementByIdFromDB(elementId);

  if (!element) {
    notFound();
  }

  return <EditElementClient initialElement={element} elementId={elementId} />;
}
