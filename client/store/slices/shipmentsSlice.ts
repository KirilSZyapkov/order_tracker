import { StateCreator } from "zustand";

export interface Shipment {
    // да коригирам с правилните данни от базата данни
    id: string;
    orderNumber: string;
    autherId: string;
    truckId: string | null;
    truckNumber: string | null;
    clientName: string;
    deliveryAddress: string;
    deliveryDay: string;
    actualDeliveryDay: string | null;
    deliveryTime: string | null;
    phone: string;
    gpsCoordinates: string | null;
    recipientName: string | null;
    status: "pending" | "inTransit" | "delivered" | "delayed";
    organizationName: string;
    createdAt: string;
    updatedAt: string | null;
};

export interface ShipmentsState {
    shipments: Shipment[];

    setShipments: (shipments: Shipment[]) => void;
    addShipment: (shipment: Shipment) => void;
    updateShipment: (id: string, shipment: Partial<Shipment>) => void;
    removeShipment: (id: string) => void;
};

export const createShipmentsSlice: StateCreator<ShipmentsState> = (set) => ({
    shipments: [],
    setShipments: (shipments) => set(()=>({ shipments })),
    addShipment: (shipment) => set((state) => ({ shipments: [...state.shipments, shipment] })),
    updateShipment: (id, update) => set((state) => ({ shipments: state.shipments.map((x) => x.id === id ? {...x, ...update} : x) })),
    removeShipment: (id) => set((state) => ({shipments: state.shipments.filter((s)=> s.id !== id)}))
})