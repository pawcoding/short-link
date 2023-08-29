import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { Store } from "./store";
import { render as renderIndex } from "./routes/index";
import { render as renderNew } from "./routes/new";
import { render as renderShow } from "./routes/show";
import { render as renderList } from "./routes/list";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", renderIndex);
app.get("/new", renderNew);
app.get("/list", (req: Request, res: Response) => {
  setTimeout(() => {
    renderList(req, res);
  }, 3000);
});
app.post("/create", renderShow);

app.get("*", async (req, res) => {
  const maybeLink = await Store.Instance.getLink(req.url.substring(1));

  if (maybeLink) {
    res.redirect(maybeLink);
  } else {
    res.sendStatus(404);
  }
});

app.delete("*", async (req, res) => {
  try {
    await Store.Instance.remove(req.url.substring(1));
    res.status(200).send("");
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
