"use client";

import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { NewUserFormType } from "@/types/form_types/newUserFormType";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/store";
import Loader from "@/components/shared/Loader";
import { apiFetch } from "@/lib/utils";
import { UserType } from "@/types/userType";

export default function SyncUser() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const setCurrentUser = useAppStore((state) => state.setUser);
  const currentUser = useAppStore((state) => state.user);
  const isUserLoaded = useAppStore((state) => state.isUserLoaded);
  // Form local state

  const [formData, setFormData] = useState<NewUserFormType>({
    firstName: "",
    secondName: "",
    phone: "",
    email: "",
    organizationName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  console.log("app/page 33", currentUser);
  console.log("app/page 34", isSignedIn);
  console.log("app/page 35", isLoaded);
  console.log("app/page 38", isUserLoaded);

  useEffect(() => {
    if (currentUser) return router.push("/orders"); // No need to show the form if user is already synced
  }, [currentUser, router]);

  // Handle form submission
  async function onSubmitNewUser(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setIsPending(true);

    if (!formData.firstName || !formData.email || !formData.secondName || !formData.phone) {
      toast.error("Please fill out all fields.");
      setIsLoading(false);
      setIsPending(false);
      return;
    };

    const newData = {
      clerkId: user?.id,
      email: formData.email,
      firstName: formData.firstName,
      secondName: formData.secondName,
      phone: formData.phone,
      organizationName: formData.organizationName,
      role: "user"
    };

    const newCreatedUser = await apiFetch<UserType>(`/api/users/`, {
      method: "POST",
      body: JSON.stringify(newData)
    });


    if (!newCreatedUser) {
      setIsLoading(false);
      setIsPending(false);
      alert("Faild to create user");
    } else {
      setFormData({
        firstName: "",
        secondName: "",
        phone: "",
        email: "",
        organizationName: "",
      });
      setIsLoading(false);
      setIsPending(false);
      setCurrentUser(newCreatedUser);
      router.push("/orders");
    }

  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    )
  }

  // да върна !isSignedIn
  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  // Wait for the DB sync to confirm whether the user exists.
  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  // If the user exists, redirect happens in useEffect – keep UI in loading state.
  if (currentUser || isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }


  return (
    <section className="flex justify-center items-center mt-10 px-4 h-screen">
      <Card className="w-full max-w-md shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            &quot;Create New User&quot;
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
              disabled={isLoading}
            >
              {isPending ? (
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


//   async function fetchAndSetUser() {
//     // да заменя тест–ид с user.id
//     const currUser = await apiFetch<UserType>(`/api/users/test_id`, {method: "GET"});
//     setCurrentUser(currUser);
//   };
//   fetchAndSetUser();
