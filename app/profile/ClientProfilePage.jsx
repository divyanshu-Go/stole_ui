"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProfileDashboard from "@/components/ProfileDashboard";
import ElementsTable from "@/components/ElementsTable";
import DeleteDialog from "@/components/DeleteDialog";

export default function ClientProfilePage({ user, elements: initialElements }) {
  const router = useRouter();
  const [elements, setElements] = useState(initialElements);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [elementToDelete, setElementToDelete] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteElement = async (elementId) => {
    try {
      await axios.delete(`/api/element/${elementId}`);
      setElements(elements.filter((el) => el._id !== elementId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl w-full">
      <ProfileDashboard user={user} handleLogout={handleLogout} />
      <ElementsTable
        user={user}
        elements={elements}
        router={router}
        setElementToDelete={setElementToDelete}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        elementToDelete={elementToDelete}
        handleDelete={handleDeleteElement}
      />
    </div>
  );
}
