import { Request, Response } from "express";
import { Store } from "../store";

export function render(req: Request, res: Response): void {
  const list = Store.Instance.list()

  res.send(`
<div>
  <table class="table table-zebra">
    <thead>
      <tr>
        <th>ID</th>
        <th>URL</th>
        <th></th>
      </tr>
    </thead>
  
    <tbody>
      ${list.map(item => `
      <tr>
        <td>${item.id}</td>
        <td>${item.url}</td>
        <td></td>
      </tr>
      `).join('')}
    </tbody>
  </table>
</div>
`)
}
