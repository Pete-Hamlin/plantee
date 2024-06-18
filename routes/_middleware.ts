import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { kv } from "util/kv.ts";

const PROTECTED_ROUTES = [
  "/",
];

export type ServerState = {
  // user: User | null;
  error: { code: number; msg: string } | null;
};

export async function handler(
  req: Request,
  ctx: FreshContext<ServerState>,
) {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;

  const protected_route = PROTECTED_ROUTES.includes(url.pathname);

  const headers = new Headers();
  headers.set("location", "/sign-in");
  console.log(url.pathname);
  console.log(protected_route);

  if (protected_route && !access_token) {
    // Can't use 403 if we want to redirect to home page.
    return new Response(null, { headers, status: 303 });
  }

  if (access_token) {
    const session = await kv.get(access_token);

    if (protected_route && !session) {
      return new Response(null, { headers, status: 303 });
    }

    // const user = JSON.parse(session!.toString())?.user;
    // ctx.state.user = user;
  }

  return await ctx.next();
}
