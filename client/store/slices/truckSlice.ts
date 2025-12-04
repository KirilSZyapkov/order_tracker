import { StateCreator } from "zustand";

export interface Truck {
    id: string;
    organization: string;
    plateNumber: string;
    createdAt: string;
    updatedAt: string;
};

export interface TruckState {
    trucks: Truck[];
    setTrucks: (trucks: Truck[])=>void;
    addTruck: (trucks: Truck)=>void;
    updateTruck: (trucks: Truck)=>void;
    removeTruck: (trucks: Truck)=>void;
};

export const createTruckSlice: StateCreator<TruckState> = (set)=>({
    truck: [],
    setTrucks: (trucks)=> set({trucks}),
    addTruck: (truck)=> set((state)=>({trucks: [...state.truck, truck]})),
    updateTruck: (truck)=> set((state)=> ({trucks: state.trucks.map((t)=> t.id === truck.id ? truck: t)})),
    removeTruck: (id)=> set((state)=> ({trucks: state.trucks.filter((t)=> t.id !== id)}))
})