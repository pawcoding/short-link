import Handlebars from "handlebars";
import { Store } from "../store";
import { t } from "elysia";

export function get() {
  return Bun.file("./src/templates/new.html");
}

const postTemplate = Handlebars.compile(
  await Bun.file("./src/templates/add.html").text(),
);

export const post = {
  handler: ({ body, store }: { body: { link: string }; store: Store }) => {
    const id = store.addLink(body.link);

    return postTemplate({
      link: body.link,
      url: `http://localhost:${Bun.env["PORT"] ?? 3000}/${id}`,
    });
  },
  hooks: {
    body: t.Object({
      link: t.String(),
    }),
  },
};
