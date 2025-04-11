import { randomUUID } from 'crypto'
import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './middlewares/database.js'
import { routes } from './middlewares/routes.js'

 
const server = http.createServer(async(req, res) => {
    const { method, url } = req

    await json(req, res)
   
}   
    return res.writeHead(404).end()  

server.listen(3333)