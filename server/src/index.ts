import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import { initialTodoList } from './initialTodoList'

dotenv.config()

const app: Express = express()
app.use(cors({ origin: 'http://localhost:5173' }))
const port = process.env.PORT || 8081

app.get('/', (req: Request, res: Response) => {
	res.send(initialTodoList)
})

app.listen(port, () => {
	console.log(`⚡ [server]: Server is running at http://localhost:${port}`)
})
