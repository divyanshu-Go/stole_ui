"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import ProfileDashboard from "@/components/ProfileDashboard";
import DeleteDialog from "@/components/DeleteDialog";
import StatusDialog from "@/components/StatusDialog";
import AdminElementsTable from "@/components/AdminElementsTable";
import LoadingScreen from "@/components/LoadingScreen";

const AdminProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState(null);
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = React.useState(true);

  // State for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [elementToDelete, setElementToDelete] = React.useState(null);

  // State for status update dialog
  const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);
  const [statusUpdateInfo, setStatusUpdateInfo] = React.useState(null);

  // Fetch user profile and all elements
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/user/profile");
        const userData = userResponse.data.user;
        setUser(userData);

        const elementsResponse = await axios.get("/api/element");
        // Filter for pending and rejected elements only
        const filteredElements = elementsResponse.data.components.filter(
          (el) => el.status === "pending" || el.status === "rejected" || el.status === 'approved'
        );
        // Sort elements - pending first, then rejected
        const sortedElements = filteredElements.sort((a, b) => {
          if (a.status === "pending" && b.status === "rejected") return -1;
          if (a.status === "rejected" && b.status === "pending") return 1;
          return 0;
        });
        setElements(sortedElements);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Handle element deletion
  const handleDeleteElement = async (elementId) => {
    try {
      await axios.delete(`/api/element/${elementId}`);
      setElements(elements.filter((el) => el._id !== elementId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Handle status update
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
      // router.push("/");
      window.location.href = '/';  //this will refresh the page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <LoadingScreen message="Loading Dashboard..." />
    );
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Profile Dashboard */}
      <ProfileDashboard user={user} handleLogout={handleLogout}    />

      {/* Elements Dashboard */}
      <AdminElementsTable elements={elements} router={router} setElementToDelete={setElementToDelete} setDeleteDialogOpen={setDeleteDialogOpen} setStatusUpdateInfo={setStatusUpdateInfo} setStatusDialogOpen={setStatusDialogOpen}   />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        elementToDelete={elementToDelete}
        handleDelete={handleDeleteElement}
      />

      {/* Update Confirmation Dialog */}
      <StatusDialog
        statusDialogOpen={statusDialogOpen}
        setStatusDialogOpen={setStatusDialogOpen}
        statusUpdateInfo={statusUpdateInfo}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default AdminProfilePage;
