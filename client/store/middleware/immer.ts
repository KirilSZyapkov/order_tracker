import {StateCreator} from "zustand";
import {produce} from "immer";

export const immer = <T>(initializer: StateCreator<T>): StateCreator<T> =>
(set, get, store) =>
    initializer(
        (partial, replace)=>{
            const nextState =
            typeof partial === "function" ? produce(partial) : partial;
            return set(nextState, replace);
        },
        get,
        store          

    )
