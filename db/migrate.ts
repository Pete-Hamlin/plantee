#!/usr/bin/env -S deno run -A

import { PostgresMigrate } from "https://deno.land/x/migrate@0.2.5/postgres.ts";
import { run } from "https://deno.land/x/migrate@0.2.5/cli.ts";
import { dirname, fromFileUrl, resolve } from "$std/path/mod.ts";
import "$std/dotenv/load.ts";

console.log(Deno.env.get("POSTGRES_PASSWORD"));
const migrate = new PostgresMigrate({
  migrationsDir: resolve(dirname(fromFileUrl(import.meta.url)), "./migrations"),
  client: {
    hostname: Deno.env.get("POSTGRES_HOST") || "localhost",
    port: Deno.env.get("POSTGRES_PORT") || 5432,
    database: Deno.env.get("POSTGRES_DB") || "plantee",
    user: Deno.env.get("POSTGRES_USER") || "plantee",
    password: Deno.env.get("POSTGRES_PASSWORD") || "plantee",
  },
});

run(migrate);
