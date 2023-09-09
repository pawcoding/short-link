import { getLinks } from "../../store";

export function links() {
  const links = getLinks();

  return (
    <div class="mx-auto px-4 max-w-screen-lg">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Creation</th>
            <th>Used</th>
            <th></th>
          </tr>
        </thead>

        <tbody
          hx-confirm="Are you sure?"
          hx-target="closest tr"
          hx-swap="outerHTML"
        >
          {links
            .map((link) => (
              <tr>
                <td class="font-mono">{link.id}</td>
                <td>{link.url}</td>
                <td>{link.createdAt.toUTCString()}</td>
                <td>{link.useCount}</td>
                <td class="text-right">
                  <button class="btn btn-square btn-xs" hx-delete="/{link.id}">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
            .join("")}
        </tbody>
      </table>
    </div>
  );
}
