import { fastify } from "fastify"
import { DatabaseMemory } from "./database-memory.js"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"

const server = fastify()
const db = new DatabaseMemory()

await server.register(fastifySwagger)
await server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    }
  })

server.get('/videos', (req, res) => {
    const search = req.query.search
    return db.list(search)
})

server.post('/videos', (req, res) => {
    const {title, description, duration} = req.body
    db.create({
        title,
        description,
        duration
    })
    return res.status(201).send()
})

server.put('/videos/:id', (req, res) => {
    const {title, description, duration} = req.body
    db.update(req.params.id, {
        title,
        description,
        duration
    })
    return res.status(204).send()
})

server.delete('/videos/:id', (req, res) => {
    db.delete(req.params.id)
    return res.status(204).send()
})

server.listen({
    port: 3333
})

