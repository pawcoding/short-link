export function newLink() {
  return (
    <>
      <section class="card w-96 bg-base-200 shadow-xl mx-auto">
        <form
          class="card-body"
          hx-post="/fragments/create"
          hx-target="#new-created"
          hx-swap="afterbegin"
        >
          <h2 class="card-title">Create new short link</h2>

          <input
            type="url"
            name="link"
            placeholder="Enter your link here"
            class="input input-bordered w-full max-w-xs"
            required="true"
          />

          <div class="card-actions justify-end">
            <button class="btn" type="submit">
              Create link
            </button>
          </div>
        </form>
      </section>

      <section class="flex flex-col gap-4 mt-8" id="new-created"></section>
    </>
  );
}
