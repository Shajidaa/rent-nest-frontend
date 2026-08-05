"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { ProfileForm } from "./profile-form";

interface ProfileViewProps {
  initialData: {
    profile: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        bio: string | null;
        phoneNumber: string | null;
        profilePhoto: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      } | null;
    };
  };
}

export default function ProfileView({ initialData }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Safely extract the user and the nested profile details based on your console log structure
  const user = initialData.profile;
  const userProfile = user?.profile;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Manage your personal details and public profile.</CardDescription>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
            <Pencil className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <ProfileForm 
            initialData={initialData} 
            onSuccess={() => setIsEditing(false)} 
            onCancel={() => setIsEditing(false)} 
          />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userProfile?.profilePhoto || ""} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{user.role}</Badge>
                  <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Phone Number</span>
                <p className="text-sm mt-1">{userProfile?.phoneNumber || "Not provided"}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm font-medium text-muted-foreground">Bio</span>
                <p className="text-sm mt-1">{userProfile?.bio || "No bio added yet."}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}