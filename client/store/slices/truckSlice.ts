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
    addTruck: (truck: Truck)=>void;
    updateTruck: (truck: Truck)=>void;
    removeTruck: (id: String)=>void;
};

export const createTruckSlice: StateCreator<TruckState> = (set)=>({
    trucks: [],
    setTrucks: (trucks)=> set({trucks}),
    addTruck: (truck)=> set((state)=>({trucks: [...state.trucks, truck]})),
    updateTruck: (truck)=> set((state)=> ({trucks: state.trucks.map((t)=> t.id === truck.id ? truck: t)})),
    removeTruck: (id)=> set((state)=> ({trucks: state.trucks.filter((t)=> t.id !== id)}))
})