import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { immer } from "./middleware/immer";

import { UserState, createUserSlice } from "./slices/userSlice";
import { TruckState, createTruckSlice } from "./slices/truckSlice";
import { ShipmentsState, createShipmentsSlice } from "./slices/shipmentsSlice";
import { UIState, createUISlice } from "./ui_slice/uiSlice";

export type AppStore = UserState & TruckState & ShipmentsState & UIState;

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createUserSlice(...a),
        ...createTruckSlice(...a),
        ...createShipmentsSlice(...a),
        ...createUISlice(...a),
      })),
      {
        name: "order-tracker-store",
        partialize: (state) => ({
          user: state.user,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    )
  )
);
