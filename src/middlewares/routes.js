import path from "path"
import { Database } from "./database.js"
import { randomUUID } from 'crypto'
import { buildRoutePath } from "../utils/build-route-path.js"

    const database = new Database()

    export const routes = [
    {
        method: 'GET',
        path: buildRoutePath ('/users'),
        handler: (req, res) => {
            const { search } = req.query

            const users = database.select('users', {
                namr: search,
                email: search,
            })

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath ('/users'),
        handler: (req, res) => {
            const { name, email } = req.body
    
            const user = {
                id: randomUUID(),
                name,
                email,
            }
    
            database.insert('users', user)
    
            return res.writeHead(201, { 'Content-Type': 'application/json' }).end(JSON.stringify(user))
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath ('/users/:id'),
        handler: (req, res) => {
            const id = req.params
            const{ name, email} = req.body

            database.delete('users', id)
            return res.writeHead(204).end()
    }
},
    {
        method: 'DELETE',
        path: buildRoutePath ('/users/:id'),
        handler: (req, res) => {
            const id = req.params

            database.delete('users', id)
            return res.writeHead(204).end()
    }
}
]  