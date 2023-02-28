import IRequest from "../interfaces/IRequest";
import { db } from "../repository/fileDB";

class TasksService {
    getTask = (): object => {
        const data = db.getTask()
        return data
    }
    addTask = (task: IRequest): object => {
        const data: object | undefined = db.addTask(task)
        return { id: Object.keys(data)[0] }
    }
    changeTask = (id: string, task: object): object => {
        db.changeTask(id, task)
        return {
            message: 'task was changed'
        }
    }
    deleteTask = (id: string): object => {
        db.deleteTask(id)
        return {
            message: 'task was deleted'
        }
    }
}

export const tasksService = new TasksService()