import { StateCreator } from "zustand";

export interface UserState {
    user: {
        id: string;
        firstName: string;
        secondName: string;
        email: string;
        phone: string;
        role: "admin" | "user";
        organizationName: string;
        createdAt: string;
        updatedAt: string;
    } | null;

    isUserLoaded: boolean;

    setUser: (user: UserState["user"]) => void;
    clearUser: () => void;
}

export const createUserSlice: StateCreator<UserState> = (set) => ({
    user: null,
    isUserLoaded: false,
    setUser: (user) => set(()=> ({user, isUserLoaded: true})),
    clearUser: () => set(()=> ({ user: null, isUserLoaded: false }))
})