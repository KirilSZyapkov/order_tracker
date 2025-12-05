import {trpc} from "@/utils/trpc";
import {useAppStore} from "@/store/store";
import {toast} from "sonner";

export function useConfirmDelivery(){
    const updateShipment = useAppStore((s)=> s.updateShipment);
    const ctx = trpc.useContext();

    const mutation = trpc.shipment.updateById.useMutation({
        async onMutate(variables){
            updateShipment({...variables, updatedAt: new Date().toISOString()}  as string);
            return {};
        },
        onerror(err, variables, context){
            toast.error("Update failed — syncing from server");
            ctx.shipment.getAll.invalidate();
        },
        onSuccess(data) {
            toast.success("Marked as delivered");
            ctx.shipment.getAll.invalidate();
        },
    })

    return {
        confirm: (id:string, recipient?:string)=> mutation.mutate({id, status:"delivered", recipient, actualDeliveryDay: new Date().toISOString()}),
        status: mutation.status,
    }
}