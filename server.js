import { fastify } from "fastify"
import { DatabaseMemory } from "./database-memory.js"

const server = fastify()
const db = new DatabaseMemory()

server.get('/', () => {
    return 'Hello World'
})

server.get('/videos', (req,res) => {
    const search = req.query.search

    return db.list(search)
})

server.post('/videos', (req, resp) => {
    const {title, description, duration} = req.body
    db.create({
        title,
        description,
        duration
    })

    return resp.status(201).send()
})

server.put('/videos/:id', (req,resp) => {
    const {title, description, duration} = req.body

    db.update(req.params.id, {
        title,
        description,
        duration
    })

    return resp.status(204).send()
})

server.delete('/videos/:id', (req, resp) => {
    db.delete(req.params.id)

    return resp.status(204).send()
})

server.listen({
    port: 3333
})

