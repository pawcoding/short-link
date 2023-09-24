import { t } from "elysia";
import { Store } from "../store";

export const get = {
  handler: ({
    params,
    store,
    set,
  }: {
    params: { id: string };
    store: Store;
    set: any;
  }) => {
    const url = store.useLink(params.id);
    set.redirect = url;
  },
  hooks: {
    params: t.Object({
      id: t.String(),
    }),
  },
};

export const del = {
  handler: ({ params, store }: { params: { id: string }; store: Store }) => {
    store.deleteLink(params.id);
  },
  hooks: {
    params: t.Object({
      id: t.String(),
    }),
  },
};
