import {StateCreator} from "zustand";

export interface Shipment {
    // да коригирам с правилните данни от базата данни
  id: string;
  truckId: string;
  status: "pending" | "loading" | "in_transit" | "delivered";
  updatedAt: string;
};

export interface ShipmentsState {
    shipments: Shipment[];

    setShipments: (s:Shipment[])=> void;
    addShipments: (s:Shipment)=> void;
    updateShipments: (s:Shipment)=> void;
};

export const createShipmentsSlice: StateCreator<ShipmentsState> = (set)=>({
    shipments: [],
    setShipments: (list)=> set({shipments: list}),
    addShipment: (s)=> set((state)=> ({shipments: [...state.shipments, s]})),
    updateShipment: (s)=> set((state)=> ({shipments: state.shipments.map((x)=> x.id === s.id ? s : x)}))
})