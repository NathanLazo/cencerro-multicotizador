import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const mexicoData = createTRPCRouter({
  getEstados: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.estado.findMany();
  }),

  // getMunicipio: publicProcedure
  // .input(z.object({name: z.string()}))
  // .query(({ ctx, input }) => {
  //   return ctx.prisma.
  // }),
});
