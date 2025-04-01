"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User, Mail, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function EditProfilePage() {
  const router = useRouter();
//   const {toast}= useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        const { name, email } = response.data.user;
        setFormData({ name, email });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
        if (error.response?.status === 401) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      const response = await axios.get('/api/user/profile');
      const userId = response.data.user._id;
      
      await axios.put(`/api/user/${userId}`, formData);
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
        duration: 3000,
      });
      
      // Optionally redirect to profile page
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="animate-pulse text-slate-200">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-zinc-800 border-zinc-700 text-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
            <CardDescription className="text-slate-400">
              Update your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-200">Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`pl-10 bg-zinc-700 border-zinc-600 text-slate-200 placeholder:text-slate-400
                      ${formErrors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                    placeholder="Enter your name"
                  />
                </div>
                {formErrors.name && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 bg-zinc-700 border-zinc-600 text-slate-200 placeholder:text-slate-400
                      ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                    placeholder="Enter your email"
                  />
                </div>
                {formErrors.email && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}