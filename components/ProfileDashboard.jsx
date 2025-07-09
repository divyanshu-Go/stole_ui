import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, LogOut, Edit, Pencil } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ProfileDashboard = ({ user, handleLogout }) => {
  const router = useRouter();

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="card-title">
          Profile Dashboard
        </CardTitle>
        <CardDescription className="card-description">
          Manage your profile and settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 py-4">
          {/* Profile Image */}
          <div className=" flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-16 h-16 text-zinc-400" />
            </div>
          </div>

          {/* User Information */}
          <div className="flex-grow space-y-4 w-full">
            {/* Structured User Details */}
            <div className="bg-zinc-800 p-4 rounded-md w-full flex flex-col gap-3">
              <h3 className="title-text max-w-max">User Details</h3>
              <div className="text-md text-zinc-400 mt-2 space-y-2">
                <p>
                  <span className="font-medium text-slate-300">Name :</span>
                  <span className="font-semibold text-slate-400">
                    {" "}
                    {user.name}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-slate-300">Email :</span>
                  <span className="font-semibold text-slate-400">
                    {" "}
                    {user.email}
                  </span>
                </p>
                {/* Future details can be added easily below */}
              </div>
            </div>

            {/* Role & Joined Date */}
            <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-md shadow-md">
              <Badge className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1">
                {user.role}
              </Badge>
              <span className="text-sm text-zinc-400">
                Joined on {format(new Date(user.createdAt), "MMMM dd, yyyy")}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 flex-wrap">
              <Button
                className="border border-indigo-500 text-indigo-300 hover:bg-indigo-700 hover:text-white"
                variant="outline"
                onClick={() => router.push("/profile/edit")}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                variant="destructive"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => router.push("/add-component")}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Create
              </Button>
              <Button
                className="border border-indigo-500 text-indigo-300 hover:bg-indigo-700 hover:text-white"
                variant="outline"
                onClick={() => router.push("/add-category")}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDashboard;
