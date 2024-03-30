import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const db = new DatabaseMemory()


server.get('/', () => {
  return 'Hello World'
})

server.get('/videos', (req) => {
  const search = req.query.search
  return db.list(search)
})

server.get('/videos/:id', (req, res) => {
  const video = db.get(req.params.id)

  if (video.length)
    return video

  return res.status(404).send()
})

server.post('/videos', (req, res) => {
  const {title, description, duration} = req.body
  if (!title || !description || !duration) {
    return res.status(400).send({ error: 'Fields title, description, and duration are required.' })
  }
  if (isNaN(duration))
    return res.status(400).send({ error: 'Duration must be a number' })
  const newVideo = db.create({
    title,
    description,
    duration
  })

  return res.status(201).send(newVideo)
})

server.put('/videos/:id', (req, res) => {
  const {title, description, duration} = req.body
  if (!title || !description || !duration) {
    return res.status(400).send({ error: 'Fields title, description, and duration are required.'})
  }
  const video = db.get(req.params.id)
  if (video.length) {
    db.update(req.params.id, {
      title,
      description,
      duration
    })
  } else {
    return res.status(404).send({ error: 'Not found any video within this id'})
  }

  return db.get(req.params.id)
})

server.delete('/videos/:id', (req, res) => {
  const video = db.get(req.params.id)

  if (video.length) {
    db.delete(req.params.id)
    return res.status(204).send()
  } else {
    return res.status(404).send()
  }
})

server.listen({
  port: 3333
})

