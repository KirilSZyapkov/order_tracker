import { trpc } from "@/utils/trpc";
import { useAppStore } from "@/store/store";
import { toast } from "sonner";

export function useConfirmDelivery() {
    const updateShipment = useAppStore((s) => s.updateShipment);
    const user = useAppStore((s) => s.user);
    const ctx = trpc.useContext();

    const mutation = trpc.shipment.updateShipmentById.useMutation({
        async onMutate(variables) {
            const { id, ...patch } = variables;
            updateShipment(id, {
                ...patch,
                updatedAt: new Date().toISOString(),
            });

            const previous = ctx.shipment.getAllShipments.getData({ organizationName: user!.organizationName });

            return { previous };

        },
        onError(err, variables, context) {
            toast.error("Update failed — syncing from server");
            if (context?.previous) {
                useAppStore.getState().setShipments(context.previous);
            }

            ctx.shipment.getAllShipments.invalidate();
        },
        onSuccess(data) {
            toast.success("Marked as delivered");
        },
    })

    return {
        confirmDelivery: (id: string, data: any) => mutation.mutate({ id, ...data }),
        status: mutation.status,
    }
}