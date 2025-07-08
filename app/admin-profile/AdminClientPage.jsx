"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import ProfileDashboard from "@/components/ProfileDashboard";
import DeleteDialog from "@/components/DeleteDialog";
import AdminElementsTable from "@/components/AdminElementsTable";
import UpdateDialog from "@/components/UpdateDialog";

export default function AdminClientPage({ user, elements: initialElements }) {
  const router = useRouter();
  const [elements, setElements] = useState(initialElements);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [elementToDelete, setElementToDelete] = useState(null);

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusUpdateInfo, setStatusUpdateInfo] = useState(null);

  const handleDeleteElement = async (elementId) => {
    try {
      await axios.delete(`/api/element/${elementId}`);
      setElements(elements.filter((el) => el._id !== elementId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleStatusUpdate = async (elementId, newStatus) => {
    try {
      await axios.put(`/api/element/${elementId}`, { status: newStatus });
      setElements(
        elements.map((el) =>
          el._id === elementId ? { ...el, status: newStatus } : el
        )
      );
      setStatusDialogOpen(false);
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Top Dashboard */}
      <ProfileDashboard user={user} handleLogout={handleLogout} />

      {/* Admin Elements Table */}
      <AdminElementsTable
        elements={elements}
        router={router}
        setElementToDelete={setElementToDelete}
        setDeleteDialogOpen={setDeleteDialogOpen}
        setStatusUpdateInfo={setStatusUpdateInfo}
        setStatusDialogOpen={setStatusDialogOpen}
      />

      {/* Modals */}
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        elementToDelete={elementToDelete}
        handleDelete={handleDeleteElement}
      />

      <UpdateDialog
        statusDialogOpen={statusDialogOpen}
        setStatusDialogOpen={setStatusDialogOpen}
        statusUpdateInfo={statusUpdateInfo}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
