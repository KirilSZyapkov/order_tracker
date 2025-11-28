import { router } from "./trpc";
import { shipmentRouter } from "./routes/shipment";
import { userRouter } from "./routes/user";
import { truckRouter } from "./routes/truck";

export const appRouter = router({
  shipment: shipmentRouter,
  user: userRouter,
  truck: truckRouter,
});

export type AppRouter = typeof appRouter;