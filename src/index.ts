import express, { Express } from 'express'
import { tasksRouter } from './controllers/tasks'
import { config } from './index.config'
import { db } from './repository/fileDB'
import cors from 'cors'

const app: Express = express()
app.use(express.json())
app.use(cors())

const run = async () => {
    db.init()
    app.use('/tasks', tasksRouter)
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`)
    })
}

run()
    .then(() => {
        console.log('Everything is ok')
    })
    .catch((err: unknown) => {
        const error = err as Error
        console.log(error.message)
    })