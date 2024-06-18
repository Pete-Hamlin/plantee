import Header from "../components/Header.tsx";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

interface Data {
  isAuthenticated: boolean;
}

const PLANTS = [
  "African Violet",
  "Alocasia",
  "Aloe",
  "Amaryllis",
];

function Login() {
  return (
    <form method="post" action="/api/login">
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({ isAuthenticated: cookies.auth === "bar" });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      <Header />
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold">Welcome to Plantee</h1>
          <p>
            You are currently {data.isAuthenticated ? "are" : "are not"}{" "}
            logged in
          </p>
          {!data.isAuthenticated ? <Login /> : <a href="/api/logout">Logout</a>}
          {data.isAuthenticated
            ? (
              <>
                <p class="my-4">
                  Try adding a plant to get started.
                </p>
                <ul>
                  {PLANTS.map((name) => <li key={name}>{name}</li>)}
                </ul>
                <div class="max-w-screen-md mx-auto flex flex-col justify-between relative">
                  <button>Add</button>
                  <button>Export</button>
                </div>
              </>
            )
            : null}
        </div>
      </div>
    </div>
  );
}
