import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const db = new DatabaseMemory()

await server.register(import('@fastify/swagger'), {
  mode: 'static',
  specification: {
    path: './src/swagger.yaml'
  },
  exposeRoute: true

})
await server.register(import('@fastify/swagger-ui'))

server.get('/', () => {
  return 'Hello World'
})

server.get('/videos', (req) => {
  return db.list(req.query.search)
})

server.get('/videos/:id', (req, res) => {
  const video = db.get(req.params.id)

  if (video.length)
    return video

  return res.status(404).send({ error: 'Not found any video within this id'})
})

server.post('/videos', (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(415).send({ error: 'Content-Type must be application/json' })
  }

  const {title, description, duration} = req.body
  if (!title || !description || !duration) {
    return res.status(400).send({ error: 'Fields title, description, and duration are required.' })
  }
  if (isNaN(duration))
    return res.status(400).send({ error: 'Duration must be a number' })

  const newVideo =
   db.create({
     title,
     description,
     duration
   })

  return res.status(201).send(newVideo)
})

server.put('/videos/:id', (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(415).send({ error: 'Content-Type must be application/json' })
  }

  const {title, description, duration} = req.body
  if (!title || !description || !duration) {
    return res.status(400).send({ error: 'Fields title, description, and duration are required.'})
  }
  const video = db.get(req.params.id)
  if (!video.length)
    return res.status(404).send({ error: 'Not found any video within this id'})

  db.update(req.params.id, {
    title,
    description,
    duration
  })
  return db.get(req.params.id)
})

server.delete('/videos/:id', (req, res) => {
  const video = db.get(req.params.id)

  if (!video.length)
    return res.status(404).send({ error: 'Not found any video within this id'})

  db.delete(req.params.id)
  return res.status(204).send()
})

server.listen({
  port: 3333
})

