import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

import { autoroutes } from "elysia-autoroutes";
import { Store } from "./store";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .decorate("store", new Store())
  .use(autoroutes())
  .onError(({ code, error }) => {
    console.error(code, error);
  })
  .listen(Bun.env["PORT"] ?? 3000);

console.log(
  `short-link is running at ${app.server?.hostname}:${app.server?.port}`,
);
