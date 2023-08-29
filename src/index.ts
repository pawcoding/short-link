import express, {Request, Response} from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { Store } from './store'
import {render as renderIndex} from './routes/index'
import {render as renderNew} from './routes/new'
import {render as renderShow} from './routes/show'
import {render as renderList} from './routes/list'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/', renderIndex)
app.get('/new', (req: Request, res: Response) => {
  setTimeout(() => {
    renderNew(req, res)
  }, 3000)
})
app.get('/list', renderList)
app.post('/create', renderShow)

app.get('*', (req, res) => {
  const maybeLink = Store.Instance.getLink(req.url.substring(1))

  if (maybeLink) {
    res.redirect(maybeLink)
  } else {
    res.sendStatus(404)
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
