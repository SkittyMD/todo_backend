import fs from 'node:fs/promises'
import IRequest from "../interfaces/IRequest";
import { Guid } from "guid-ts";
import ITask from '../interfaces/ITask';

class FileDB {
    data: ITask[]
    path: string
    constructor() {
        this.data = []
        this.path = './tasks/'
    }
    init = async () => {
        try {
            const dirContents = await fs.readdir(this.path)
            dirContents.forEach(async (file) => {
                const fileContents = await fs.readFile((this.path + file), { encoding: 'utf-8' });
                this.data.push(JSON.parse(fileContents))
            })
        } catch (err: unknown) {
            const error = err as Error
            console.log(error.message)
            await fs.mkdir(this.path)
            console.log('the messages folder has been created')
        }
    }
    getTask = () => {
        const response: ITask = {}
        const data = JSON.parse(JSON.stringify(this.data))
        data.forEach((el: ITask) => {
            const key: string = Object.keys(el)[0]
            response[key] = el[key]
            if (Date.parse(new Date().toISOString()) > Date.parse(el[key].dateDeadline)) {
                el[key].status = 'overdue'
            }
        })
        this.data = data
        return response
    }
    addTask = (data: IRequest): object => {
        const newGuid: string = Guid.newGuid().toString()
        const task = { [newGuid]: data }
        this.data.push(task)
        this.save(newGuid, data)
        return task
    }
    deleteTask = async (id: string) => {
        try {
            await fs.unlink(this.path + id + '.txt')
            const data = JSON.parse(JSON.stringify(this.data))
            const filter = data.filter((el: object) => Object.keys(el)[0] !== id)
            console.log(filter.length)
            this.data = filter
        } catch (err) {
            console.log(err)
        }
    }
    changeTask = async (id: string, task: object) => {
        try {
            const data = JSON.parse(JSON.stringify(this.data))
            const index = data.findIndex((el: object) => Object.keys(el)[0] === id)
            data[index][id] = { ...task }
            this.data = data
            this.save(id, task)
        } catch (err) {
            console.log(err)
        }
    }
    save = async (id: string, data: object) => {
        try {
            const filename = id + '.txt'
            await fs.writeFile(this.path + filename, JSON.stringify({ [id]: data }))
        } catch (err: unknown) {
            const error = err as Error
            console.log(error.message)
        }
    }
}

export const db = new FileDB()