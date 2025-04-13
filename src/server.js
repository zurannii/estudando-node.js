import http from 'node:http'
import { parse } from 'url'
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'

// query paramenters: url stateful => filros, paginação, não-obrigatórios
// route parameters: url stateless => identificação de recursos, obrigatórios
// request body: enviar dados para o servidor, não-obrigatórios

//http://localhost:3333/users?id=1&name=Lucas
//http://localhost:3333/users/1
// http://localhost:3333/users/1?name=Lucas&age=20

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  const { pathname } = parse(url, true)

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === pathname
  })

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)

