import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

import { index } from "./routes";
import { newLink } from "./routes/fragments/new";
import { create } from "./routes/fragments/create";
import { links } from "./routes/fragments/links";
import { deleteLink, useLink } from "./store";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())
  .onError(({ code, error }) => {
    console.error(code, error);
  })
  .get("/", () => index())
  .group("/fragments", (app) => {
    return app
      .get("/new", () => newLink())
      .post("/create", ({ body }: any) => create(body))
      .get("/list", () => links());
  })
  .delete("/:id", ({ params: { id } }) => {
    deleteLink(id);
    return;
  })
  .get("/:id", ({ params: { id }, set }) => {
    const url = useLink(id);
    set.redirect = url;
    return;
  })
  .listen(Bun.env["PORT"] ?? 3000);

console.log(
  `short-link is running at ${app.server?.hostname}:${app.server?.port}`,
);
