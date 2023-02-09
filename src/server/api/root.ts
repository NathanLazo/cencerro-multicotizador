import { createTRPCRouter } from "./trpc";
import { GetMexicoData } from "./routers/getMexicoData";
import { UserData } from "./routers/userData";
import { useCustomAuth } from "./routers/customAuth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  getMexicoData: GetMexicoData,
  userData: UserData,
  useCustomAuth: useCustomAuth,
});

// export type definition of API
export type AppRouter = typeof appRouter;
