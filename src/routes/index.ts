import { Request, Response } from 'express'

export function render(req: Request, res: Response): void {
  res.send(`
${head()}
${body()}
`)
}

function head(): string {
 return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Short Link</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.6.2/dist/full.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.tailwindcss.com"></script>

    <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>    
  </head>
</html>
`
}

function body(): string {
  return `
<body>
  <header>
    <nav class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">
          Short Link
        </a>
      </div>

      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a>
              New link
            </a>
          </li>

          <li>
            <a>
              All links
            </a>
          </li>
        </ul>
      <div>
    </nav>  
  </header>

  <footer>
    <div class="navbar-center bg-base-100">
      <ul class="menu menu-horizontal px-1">
        <li>
          <a href="https://pawcode.de/" target="_blank">
            pawcode Development
          </a>
        </li>

        <li>
          <a href="https://www.snapaddy.com/" target="_blank">
            snapADDY
          </a>
        </li>
      </ul>
    </div>
  </footer>
</body>
`
}
