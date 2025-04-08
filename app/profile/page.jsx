"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProfileDashboard from "@/components/ProfileDashboard";
import ElementsTable from "@/components/ElementsTable";
import DeleteDialog from "@/components/DeleteDialog";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [elementToDelete, setElementToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const { data: userResponse } = await axios.get("/api/user/profile");
        setUser(userResponse.user);

        // Fetch elements using user ID
        const { data: elementsResponse } = await axios.get(`/api/user/${userResponse.user._id}/element`);
        setElements(elementsResponse.elements);
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

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      // router.push("/");
      window.location.href = '/'; 
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl w-full">
      {/* Profile Section */}
      <ProfileDashboard user={user} handleLogout={handleLogout} />

      {/* Elements Dashboard */}
      <ElementsTable
        elements={elements}
        router={router}
        setElementToDelete={setElementToDelete}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        elementToDelete={elementToDelete}
        handleDelete={handleDeleteElement}
      />
    </div>
  );
};

export default ProfilePage;
