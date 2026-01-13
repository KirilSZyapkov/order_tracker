
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAppStore } from "@/store/store";
import { toast } from "sonner";
import { UserType } from "@/types/userType";
import { apiFetch } from "@/lib/utils";
import {useUser} from "@clerk/nextjs";

export function useUserSync() {
  // const {user, isLoaded} = useUser();
  const userId = "test_id";
  const setUser = useAppStore((s) => s.setUser);

  const query = useQuery<UserType | null>({

    queryKey: ["user", userId],

    enabled: Boolean(userId),
    staleTime: 0,
    cacheTime: 0,
    retry: false,
    queryFn: async (): Promise<UserType | null> => {
      // да заменя тест–ид с user.id
      const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
      const userData = await apiFetch<UserType>(`${server}/api/users/${userId}`,
        { method: "GET" });

      return userData;
    }
  })

  const { data, isError, isLoading, refetch } = query;

  useEffect(() => {
    if (data) {
      setUser(data);
    } else {
      setUser(null);
    }
  }, [data]);

  console.log("useUserSync", data );

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load user");
    }
  }, [isError]);

  return { isLoading, refetch };
}