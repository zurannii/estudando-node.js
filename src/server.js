import http from 'node:http'
import { parse } from 'url'
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'
import { extractQueryParams } from './extract-quey-params.js'

// query paramenters: url stateful => filros, paginação, não-obrigatórios
// route parameters: url stateless => identificação de recursos, obrigatórios
// request body: enviar dados para o servidor, não-obrigatórios (HTTPs)

//http://localhost:3333/users?id=1&name=Lucas
//http://localhost:3333/users/1
// http://localhost:3333/users/1?name=Lucas&age=20

// edição e remoção do usuario

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  const { pathname } = parse(url, true)

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    //console.log(extractQueryParams(routeParams.groups.query))

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)

