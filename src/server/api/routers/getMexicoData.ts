import { createTRPCRouter, publicProcedure } from "../trpc";

export const GetMexicoData = createTRPCRouter({
  getEstados: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.estado.findMany();
  }),
});
