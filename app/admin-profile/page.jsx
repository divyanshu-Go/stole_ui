"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { format } from 'date-fns';
import { User, LogOut, Eye, Trash2, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ProfileDashboard from '@/components/ProfileDashboard';

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
        const userResponse = await axios.get('/api/user/profile');
        const userData = userResponse.data.user;
        setUser(userData);

        const elementsResponse = await axios.get('/api/element');
        // Filter for pending and rejected elements only
        const filteredElements = elementsResponse.data.components.filter(
          el => el.status === 'pending' || el.status === 'rejected'
        );
        // Sort elements - pending first, then rejected
        const sortedElements = filteredElements.sort((a, b) => {
          if (a.status === 'pending' && b.status === 'rejected') return -1;
          if (a.status === 'rejected' && b.status === 'pending') return 1;
          return 0;
        });
        setElements(sortedElements);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          router.push('/login');
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
      setElements(elements.filter(el => el._id !== elementId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (elementId, newStatus) => {
    try {
      await axios.put(`/api/element/${elementId}`, { status: newStatus });
      setElements(elements.map(el => 
        el._id === elementId ? { ...el, status: newStatus } : el
      ));
      setStatusDialogOpen(false);
    } catch (error) {
      console.error('Status update error:', error);
    }
  };


  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Profile Dashboard */}
      <ProfileDashboard user={user} handleLogout={handleLogout}/>

      {/* Elements Dashboard */}
      <Card className="text-slate-400 bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Element Submissions</CardTitle>
          <CardDescription>Manage and review submitted elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-zinc-800">
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Created</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {elements.map((element) => (
                  <tr key={element._id} className="border-b border-zinc-800">
                    <td className="py-4">{element.title}</td>
                    <td className="py-4">
                      <Badge variant="secondary">{element.category}</Badge>
                    </td>
                    <td className="py-4">
                      <Badge 
                        className={`${getStatusColor(element.status)} text-white`}
                      >
                        {element.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-zinc-400">
                      {format(new Date(element.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/elements/elementId/${element._id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-0">
                            <div className="flex flex-col">
                              {['pending', 'approved', 'rejected'].map((status) => (
                                <Button
                                  key={status}
                                  variant="ghost"
                                  className="justify-start capitalize"
                                  onClick={() => {
                                    setStatusUpdateInfo({
                                      elementId: element._id,
                                      currentStatus: element.status,
                                      newStatus: status,
                                      title: element.title
                                    });
                                    setStatusDialogOpen(true);
                                  }}
                                >
                                  {status}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setElementToDelete(element);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{elementToDelete?.title}&quot;. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteElement(elementToDelete._id)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Update Confirmation Dialog */}
      <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status of &quot;{statusUpdateInfo?.title}&quot; 
              from &quot;{statusUpdateInfo?.currentStatus}&quot; to &quot;{statusUpdateInfo?.newStatus}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleStatusUpdate(statusUpdateInfo.elementId, statusUpdateInfo.newStatus)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Update Status
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProfilePage;