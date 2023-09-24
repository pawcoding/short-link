import Handlebars from "handlebars";
import { Store } from "../store";

const linksTemplate = Handlebars.compile(
  await Bun.file("./src/templates/links.html").text(),
);

export function get({ store }: { store: Store }) {
  const links = store.getLinks();

  return linksTemplate({
    links: links.map((link) => ({
      ...link,
      createdAt: link.createdAt.toUTCString(),
    })),
  });
}
