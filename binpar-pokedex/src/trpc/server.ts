// src/trpc/server.ts
import { cache } from "react";
import { headers } from "next/headers";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";


const createCaller = cache(() => {
  const h = headers();
  const ctx = createTRPCContext({
    headers: h as unknown as Headers,
  });
  return appRouter.createCaller(ctx);
});


type Caller = ReturnType<typeof createCaller>;

export const api = {
  pokemon: {
    meta: () => createCaller().pokemon.meta(),

    list: (input: Parameters<Caller["pokemon"]["list"]>[0]) =>
      createCaller().pokemon.list(input),

    detail: (input: Parameters<Caller["pokemon"]["detail"]>[0]) =>
      createCaller().pokemon.detail(input),
  },
};
