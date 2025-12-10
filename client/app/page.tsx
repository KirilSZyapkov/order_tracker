"use client";

import { useUser } from "@clerk/nextjs";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { NewUserFormType } from "@/types/form_types/newUserFormType";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/store";
import Loader from "@/components/shared/Loader";

export default function SyncUser() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const setCurrentUser = useAppStore((state) => state.setUser)
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
    onSuccess: async (newUser) => {
      toast.success("User synced successfully!");
      setCurrentUser(newUser);
      router.push("/orders");
    },
    onError: () => {
      toast.error("❌ Failed to create user.");
    },
  });
// Todo... да върна user от клърк в if проверката!
  if (currentUser) return router.push("/dashboard"); // No need to show the form if user is already synced

  // Handle form submission
  async function onSubmitNewUser(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.secondName || !formData.phone) {
      toast.error("Please fill out all fields.");
      return;
    };
    if (!user) {
      createUser.mutate({
        // todo... да заменя тестовото id с оригинално от клърк
        clerkId: "test_id",
        email: formData.email,
        firstName: formData.firstName,
        secondName: formData.secondName,
        phone: formData.phone,
        organizationName: formData.organizationName,
        role: "user"
      });
    } else {
      alert("Faild to create user");
    }
  }

  if (!isLoaded || isFetchingUser) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader/>
      </div>
    )
  }

  return (
    <section className="flex justify-center items-center mt-10 px-4 h-screen">
      <Card className="w-full max-w-md shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            "Create New User"
          </CardTitle>
        </CardHeader>

        <CardContent>
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
                  setFormData((prev) => ({ ...prev, organizationName: e.target.value }))
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
        </CardContent>
      </Card>
    </section>
  );
}
