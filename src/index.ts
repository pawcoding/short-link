import express from 'express'
import dotenv from 'dotenv'
import {render as renderIndex} from './routes/index'

dotenv.config()

const app = express()
const port = process.env.PORT

app.get('/', renderIndex)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
