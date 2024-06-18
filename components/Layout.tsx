import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

import { ServerState } from "routes/_middleware.ts";
import { NavLink } from "components/index.ts";

type Props = {
  children: ComponentChildren;
  state: ServerState;
};

export function Layout(props: Props) {
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>

      <div class="bg-primary">
        <nav class="flex items-center justify-between flex-wrap min-h-[80px] max-w-screen-md mx-auto p-4">
          <a href="/">
            <div class="flex flex-shrink-0 border-white">
              <h1 class="ml-2 text-white">Plantee</h1>
            </div>
          </a>

          <div class="flex flex-grow border-gray pt-1">
            <div class="flex sm:flex-shrink-0">
              <NavLink href="/sign-in">Sign In</NavLink>
            </div>
            <div class="flex flex-grow">
              <NavLink href="/plants">Plants</NavLink>
            </div>
            <div class="flex flex-grow">
              <NavLink href="/tasks">Tasks</NavLink>
            </div>
          </div>
        </nav>
      </div>

      <div class="mx-auto max-w-screen-md p-4">
        {props.children}
      </div>
    </>
  );
}
