import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hash } from "argon2";
import { TRPCError } from "@trpc/server";
import { toast } from "react-hot-toast";

export const useCustomAuth = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(input.password);

      const result = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      toast.success("Account created successfully");

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
});
