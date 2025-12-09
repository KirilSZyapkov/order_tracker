
import { useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useAppStore } from "@/store/store";
import { toast } from "sonner";

export function useUserSync() {

  const setUser = useAppStore((s) => s.setUser);

  const { data, isError, isLoading, refetch } = trpc.user.getUserById.useQuery(undefined, { enabled: true });

  useEffect(() => {
    if (data) {
      setUser(data);
    } else {
      setUser(null);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load user");
    }
  }, [isError]);

  return { isLoading, refetch };
}