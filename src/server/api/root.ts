import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { GetMexicoData } from "./routers/getMexicoData";
import { UserData } from "./routers/userData";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  getMexicoData: GetMexicoData,
  userData: UserData,
});

// export type definition of API
export type AppRouter = typeof appRouter;
