// store/middleware/immer.ts
import { StateCreator } from "zustand";
import { produce } from "immer";

export function immer<T extends object>(
  config: StateCreator<T>
): StateCreator<T> {
  return (set, get, store) =>
    config(
      (partial, replace) => {
        // Ако partial е функция => това е recipe на immer
        if (typeof partial === "function") {
          set(
            produce(partial) as (state: T) => T,
            replace
          );
        } else {
          // Ако partial е обект
          set(partial as Partial<T>, replace);
        }
      },
      get,
      store
    );
}
