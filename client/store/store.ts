import { create } from "zustand";
import { UserState, createUserSlice } from "./slices/userSlice";
import { TruckState, createTruckSlice } from "./slices/truckSlice";
import { createShipmentsSlice, ShipmentsState } from "./slices/shipmentsSlice";

export type AppStore = UserState & TruckState & ShipmentsState;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createUserSlice(...args),
  ...createTruckSlice(...args),
  ...createShipmentsSlice(...args),
}));
