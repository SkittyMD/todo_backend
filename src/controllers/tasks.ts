import express, { Router, Request, Response } from 'express'
import { tasksService } from '../services/tasks'

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
    try {
        const response = tasksService.getTask()
        res.send(response)
    } catch (err) {
        res.sendStatus(500)
    }
})

router.post('/', (req: Request, res: Response) => {
    try {
        const response = tasksService.addTask(req.body)
        res.send(response)
    } catch (err) {
        res.sendStatus(500)
    }
})

router.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const response = tasksService.changeTask(id, req.body)
    res.send(response)
    try {
    } catch (err) {
        res.sendStatus(500)
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const response = tasksService.deleteTask(id)
    res.send(response)
    try {
    } catch (err) {
        res.sendStatus(500)
    }
})

export const tasksRouter = router