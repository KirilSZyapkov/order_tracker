import { router } from "./trpc";
import { shipmentRouter } from "./routes/shipment";
import { userRouter } from "./routes/user";

export const appRouter = router({
  shipment: shipmentRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;