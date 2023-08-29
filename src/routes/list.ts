import { Request, Response } from "express";
import { Store } from "../store";

export async function render(req: Request, res: Response): Promise<void> {
  const list = await Store.Instance.list()

  res.send(`
<div>
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
  
    <tbody>
      ${list.map(item => `
      <tr>
        <td>${item.id}</td>
        <td>${item.url}</td>
        <td>${item.createdAt.toUTCString()}</td>
        <td>${item.used}</td>
        <td></td>
      </tr>
      `).join('')}
    </tbody>
  </table>
</div>
`)
}
