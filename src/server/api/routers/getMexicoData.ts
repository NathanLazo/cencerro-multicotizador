import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const GetMexicoData = createTRPCRouter({
  getEstados: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.estado.findMany();
  }),

  // getMunicipio: publicProcedure
  // .input(z.object({name: z.string()}))
  // .query(({ ctx, input }) => {
  //   return ctx.prisma.
  // }),
});
