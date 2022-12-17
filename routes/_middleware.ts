import { MiddlewareHandler } from '$fresh/server.ts';

export const handler: MiddlewareHandler = async (_req, ctx) => {
  const resp = await ctx.next();

  return resp;
};
