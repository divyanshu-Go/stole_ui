import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, LogOut, Edit, Pencil} from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";


const ProfileDashboard = ({user, handleLogout }) => {
const router = useRouter();

  return (
    <Card className="mb-8 text-slate-300 bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-200 font-bold">Profile Dashboard</CardTitle>
          <CardDescription>Manage your profile and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center">
                <User className="w-16 h-16 text-zinc-400" />
              </div>
            </div>

            {/* User Details */}
            <div className="flex-grow space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-zinc-400">{user.email}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {user.role}
                </Badge>
                <span className="text-sm text-zinc-400">
                  Joined {format(new Date(user.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => router.push('/profile/edit')}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <Button
                className="hover:bg-emerald-700 bg-emerald-600"
                  variant=""
                  onClick={()=>router.push("/add-component")}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

export default ProfileDashboard
