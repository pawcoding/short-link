import { Request, Response } from 'express'

export function render(req: Request, res: Response): void {
  res.send(`
<section class="card w-96 bg-base-200 shadow-xl mx-auto">
  <form class="card-body" hx-post="/create" hx-target="#new-created" hx-swap="afterbegin" hx-on::after-request="this.reset()">
    <h2 class="card-title">Create new short link</h2>

    <input type="url" name="link" placeholder="Enter your link here" class="input input-bordered w-full max-w-xs" required>

    <div class="card-actions justify-end">
      <button class="btn" type="submit">
        Create link
      </button>
    </div>
  </form>
</section>

<section class="flex flex-col gap-4 mt-8" id="new-created"></section>
`)
}
