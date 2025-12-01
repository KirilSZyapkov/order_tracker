"use client";

import { useUser } from "@clerk/nextjs";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { NewUserFormType } from "@/types/form_types/newUserFormType";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function SyncUser() {
  const { user, isSignedIn, isLoaded } = useUser();

  // Form local state
  const [formData, setFormData] = useState<NewUserFormType>({
    firstName: "",
    secondName: "",
    phone: "",
    email: "",
    organizationName: "",
  });

  // Fetch current user
  const {
    data: currentUser,
    isLoading: isFetchingUser,
    refetch,
  } = trpc.user.getUserById.useQuery(undefined, {
    enabled: isSignedIn && !!user,
  });

  // Mutation: create user
  const createUser = trpc.user.createNewUser.useMutation({
    onSuccess: async () => {
      toast.success("User synced successfully!");
      await refetch();
    },
    onError: () => {
      toast.error("❌ Failed to create user.");
    },
  });

  if(currentUser && user) return null; // No need to show the form if user is already synced

  // Handle form submission
  async function onSubmitNewUser(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.secondName || !formData.phone) {
      toast.error("Please fill out all fields.");
      return;
    }

    createUser.mutate({
      clerkId: user?.id,
      email: formData.email,
      firstName: formData.firstName,
      secondName: formData.secondName,
      phone: formData.phone,
      organizationName: formData.organizationName,
      role: "USER"
    });
  }

  return (
    <section className="flex justify-center mt-10 px-4">
      <Card className="w-full max-w-md shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            {currentUser?.user ? "User Information" : "Create New User"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!isLoaded || isFetchingUser ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin w-6 h-6" />
            </div>
          ) : currentUser?.user ? (
            // If user exists, show basic info
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                You are already synced.
              </p>
              <p className="font-medium">{currentUser.user.name}</p>
              <p className="text-muted-foreground">{currentUser.user.email}</p>
            </div>
          ) : (
            // If no user exists → show form
            <form onSubmit={onSubmitNewUser} className="space-y-5">
              {/* First Name */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">First Name</label>
                <Input
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                />
              </div>
              {/* Second Name */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Second Name</label>
                <Input
                  placeholder="Enter your second name"
                  value={formData.secondName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, secondName: e.target.value }))
                  }
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Email</label>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  placeholder="Enter your phone"
                  type="number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>

              {/* Organisation */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Organisation</label>
                <Input
                  placeholder="Enter Organisation"
                  value={formData.organizationName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full"
                disabled={createUser.isPending}
              >
                {createUser.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Create User"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
