import { createTRPCRouter } from "./trpc";
import { mexicoData } from "./routers/mexicoData";
import { UserData } from "./routers/userData";
import { useCustomAuth } from "./routers/customAuth";
import { insuranceData } from "./routers/insuranceData";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  mexicoData: mexicoData,
  userData: UserData,
  useCustomAuth: useCustomAuth,
  insuranceData: insuranceData,
});

// export type definition of API
export type AppRouter = typeof appRouter;
