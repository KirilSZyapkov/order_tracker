import { StateCreator } from "zustand";

export interface UIState {
  sidebarOpen: boolean;
  modal: string | null;

  toggleSidebar: () => void;
  openModal: (name: string) => void;
  closeModal: () => void;
}

export const createUISlice: StateCreator<UIState> = (set) => ({
  sidebarOpen: false,
  modal: null,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  openModal: (name) => set({ modal: name }),
  closeModal: () => set({ modal: null }),
});
