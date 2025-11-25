import { shipmentsRouter } from "./routes/shipments";
import { router } from "./trpc";

export const appRouter = router({
  shipments: shipmentsRouter,
});

export type AppRouter = typeof appRouter;