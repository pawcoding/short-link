import { Request, Response } from "express";

export function render(req: Request, res: Response): void {
  res.send(`
${head()}
${body()}
`);
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
`;
}

function body(): string {
  return `
<body class="flex flex-col justify-between gap-8 min-h-screen">
  <header>
    <nav class="navbar bg-base-200">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">
          Short Link
        </a>
      </div>

      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a hx-get="/new" hx-trigger="click, keyup[altKey&&key=='n'] from:body" hx-target="main" hx-indicator="#main-load">
              New link
            </a>
          </li>

          <li>
            <a hx-get="/list" hx-trigger="click, keyup[altKey&&key=='l'] from:body" hx-target="main" hx-indicator="#main-load">
              All links
            </a>
          </li>
        </ul>
      <div>
    </nav>  
  </header>
  
  <div class="relative">
    <section class="modal modal-open pointer-events-none htmx-indicator" id="main-load">
      <div class="modal-box text-center w-32">
        <span class="loading loading-dots loading-lg text-accent-focus mx-auto"></span>
      </div>
    </section>

    <main hx-get="/new" hx-trigger="load"></main>
  </div>

  <footer class="footer footer-center p-10 bg-base-200 text-base-content rounded">
    <div class="grid grid-flow-col gap-4">
      <a class="link link-hover" href="https://pawcode.de/" target="_blank">
        pawcode Development
      </a>

      <a class="link link-hover" href="https://www.snapaddy.com/" target="_blank">
        snapADDY
      </a>

      <a class="link link-hover" href="https://www.meetup.com/de-DE/front-end-wuerzburg/" target="_blank">
        FrankenJS Würzburg
      </a>
    </div>

    <div class="grid grid-flow-col gap-4">
      <a href="https://github.com/pawcoding/short-link" target="_blank">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path></svg>
      </a>
    </div>
  </footer>
</body>
`;
}
