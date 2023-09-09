import { addLink } from "../../store";

export function create(body: { link: string }) {
  const id = addLink(body.link);

  return (
    <section class="card w-96 bg-accent text-accent-content mx-auto">
      <div class="card-body">
        <strong>http://localhost:{Bun.env["PORT"] ?? 3000}/{id}</strong>

        <p class="truncate">{body.link}</p>
      </div>
    </section>
  );
}
