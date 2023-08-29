import { Request, Response } from "express";
import { Store } from "../store";

export async function render(req: Request, res: Response): Promise<void> {
  const list = await Store.Instance.list()

  res.send(`
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
  
    <tbody hx-confirm="Are you sure?" hx-target="closest tr" hx-swap="outerHTML">
      ${list.map(item => `
      <tr>
        <td class="font-mono">${item.id}</td>
        <td>${item.url}</td>
        <td>${item.createdAt.toUTCString()}</td>
        <td>${item.used}</td>
        <td class="text-right">
          <button class="btn btn-square btn-xs" hx-delete="/${item.id}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </td>
      </tr>
      `).join('')}
    </tbody>
  </table>
</div>
`)
}
